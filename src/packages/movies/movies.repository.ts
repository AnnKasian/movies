import { type IncludeOptions, Op, type WhereOptions } from "@sequelize/core";
import { Movies } from "../../../database/models/movies.js";
import { Actors } from "../../../database/models/actors.js";
import { MovieActors } from "../../../database/models/movie-actors.js";
import {
  type MovieQueryDto,
  type MovieCreateDto,
  type MovieUpdateDto,
  type MovieFilters,
  type MovieResponse,
} from "./libs/types/types.js";

class MoviesRepository {
  private readonly movies = Movies;
  private readonly actors = Actors;
  private readonly movieActors = MovieActors;

  async create({
    title,
    year,
    format,
    actors,
  }: MovieCreateDto): Promise<MovieResponse> {
    const movie = await this.movies.create({
      title,
      year,
      format,
    });

    if (actors && actors.length > 0) {
      for (const actorName of actors) {
        const [actor] = await this.actors.findOrCreate({
          where: { name: actorName.trim() },
          defaults: { name: actorName.trim() },
        });

        await this.movieActors.create({
          movieId: movie.id,
          actorId: actor.id,
        });
      }
    }

    const movieWithActors = (await this.movies.findByPk(movie.id, {
      attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
      include: [
        {
          model: Actors,
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
      ],
      raw: false,
    })) as Movies;

    return {
      id: movieWithActors.id,
      title: movieWithActors.title,
      year: movieWithActors.year,
      format: movieWithActors.format,
      actors:
        movieWithActors.actors?.map((actor) => ({
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        })) || [],
      createdAt: movieWithActors.createdAt,
      updatedAt: movieWithActors.updatedAt,
    };
  }

  async findAll(query: MovieQueryDto): Promise<Movies[]> {
    const { actor, title, search, limit, offset, order, sort } = query;

    let includeOptions: IncludeOptions[] = [];
    let whereOptions: WhereOptions = {};

    if (actor) {
      includeOptions = [
        {
          model: Actors,
          attributes: [],
          where: { name: { [Op.like]: `%${actor}%` } },
          required: true,
          through: { attributes: [] },
        },
      ];
    }

    if (title) {
      whereOptions.title = { [Op.like]: `%${title}%` };
    }

    if (!search) {
      return await this.movies.findAll({
        attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
        where: whereOptions,
        include: includeOptions,
        offset,
        limit,
        order: [[sort, order]],
      });
    }

    const moviesByTitle = await this.movies.findAll({
      attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
      where: {
        title: { [Op.like]: `%${search}%` },
      },
    });

    const moviesByActor = await this.movies.findAll({
      attributes: ["id"],
      include: [
        {
          model: Actors,
          attributes: [],
          where: { name: { [Op.like]: `%${search}%` } },
          required: true,
          through: { attributes: [] },
        },
      ],
    });

    const allMovieIds = [
      ...moviesByTitle.map((m) => m.id),
      ...moviesByActor.map((m) => m.id),
    ];
    const uniqueMovieIds = [...new Set(allMovieIds)];

    if (uniqueMovieIds.length === 0) {
      return [];
    }

    return await this.movies.findAll({
      attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
      where: {
        id: { [Op.in]: uniqueMovieIds },
      },
      offset,
      limit,
      order: [[sort, order]],
    });
  }

  async update(
    id: string,
    { title, year, format, actors }: MovieUpdateDto
  ): Promise<number[]> {
    const updateResult = await this.movies.update(
      {
        title,
        year,
        format,
      },
      {
        where: { id },
      }
    );

    if (actors?.length) {
      await this.movieActors.destroy({
        where: { movieId: id },
      });

      for (const actorName of actors) {
        const [actor] = await this.actors.findOrCreate({
          where: { name: actorName.trim() },
          defaults: { name: actorName.trim() },
        });

        await this.movieActors.create({
          movieId: id,
          actorId: actor.id,
        });
      }
    }

    return updateResult;
  }

  async find(data: MovieFilters): Promise<MovieResponse | null> {
    const movie = await this.movies.findOne({
      attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
      where: {
        ...(data.id && { id: data.id }),
        ...(data.title && { title: data.title }),
      },
      include: [
        {
          model: Actors,
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
      ],
    });

    if (!movie) {
      return null;
    }

    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      actors:
        movie.actors?.map((actor) => ({
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        })) || [],
    };
  }

  async delete(id: string): Promise<number> {
    await this.movieActors.destroy({
      where: { movieId: id },
    });

    return await this.movies.destroy({
      where: { id },
    });
  }
}

export { MoviesRepository };
