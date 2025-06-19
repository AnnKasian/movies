import { col, literal, Op, type WhereOptions } from "@sequelize/core";
import { Movies } from "../../../database/models/movies.js";
import { type MovieActorsRepository } from "./movie-actors.repository.js";
import {
  type MovieQueryDto,
  type MovieCreateDto,
  type MovieUpdateDto,
  type MovieFilters,
  type MovieResponse,
} from "./libs/types/types.js";

class MoviesRepository {
  private readonly movies = Movies;
  private readonly movieActorsRepository: MovieActorsRepository;

  constructor(movieActorsRepository: MovieActorsRepository) {
    this.movieActorsRepository = movieActorsRepository;
  }

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
      await this.movieActorsRepository.create(actors, movie.id);
    }

    const movieActors = await this.movieActorsRepository.find({ id: movie.id });

    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      actors:
        movieActors?.map((actor) => ({
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        })) || [],
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async findAll(query: MovieQueryDto): Promise<Movies[]> {
    const { actor, title, search, limit, offset, order, sort } = query;

    let whereOptions: WhereOptions = {};
    let movieIdsFromActors: string[] = [];

    if (actor || search) {
      movieIdsFromActors = await this.movieActorsRepository.findAll(
        actor,
        search
      );
    }

    if (title) {
      whereOptions.title = { [Op.like]: `%${title}%` };
    }

    if (!search) {
      if (movieIdsFromActors.length > 0) {
        whereOptions.id = { [Op.in]: movieIdsFromActors };
      }

      return await this.movies.findAll({
        attributes: ["id", "title", "year", "format", "createdAt", "updatedAt"],
        where: whereOptions,
        offset,
        limit,
        order:
          sort === "title"
            ? [[literal("title COLLATE NOCASE"), order]]
            : [[col(sort), order]],
      });
    }

    const moviesByTitle = await this.movies.findAll({
      attributes: ["id"],
      where: {
        title: { [Op.like]: `%${search}%` },
      },
    });

    const titleMovieIds = moviesByTitle.map((m) => m.id);

    const allMovieIds = [...titleMovieIds, ...movieIdsFromActors];
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
      order:
        sort === "title"
          ? [[literal("title COLLATE NOCASE"), order]]
          : [[col(sort), order]],
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
      await this.movieActorsRepository.update(actors, id);
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
    });

    if (!movie) {
      return null;
    }

    const actors = await this.movieActorsRepository.find({ id: movie?.id });

    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      actors:
        actors?.map((actor) => ({
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        })) || [],
    };
  }

  async delete(id: string): Promise<number> {
    await this.movieActorsRepository.delete(id);

    return await this.movies.destroy({
      where: { id },
    });
  }
}

export { MoviesRepository };
