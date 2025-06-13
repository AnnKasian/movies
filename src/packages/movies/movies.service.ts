import { type MoviesRepository } from "./movies.repository.js";
import { type MoviesFileService } from "./movie-files.servise.js";
import {
  type MovieDto,
  type MovieCreateDto,
  type MovieUpdateDto,
  type MovieQueryDto,
  type MovieImportDto,
} from "./libs/types/types.js";
import { AppException } from "../../libs/exceptions/exceptions.js";

class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly moviesFileService: MoviesFileService
  ) {}

  async create({
    title,
    year,
    format,
    actors,
  }: MovieCreateDto): Promise<MovieDto> {
    const existedMovie = await this.moviesRepository.find({
      title,
    });

    if (existedMovie) {
      throw new AppException("MOVIE_EXISTS", { title: "NOT_UNIQUE" });
    }

    const movie = await this.moviesRepository.create({
      title,
      year,
      format,
      actors,
    });

    const actorsArray =
      movie.actors?.map((actor) => {
        return {
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        };
      }) || [];

    return { ...movie, actors: actorsArray };
  }

  async update(
    id: string,
    { title, year, format, actors }: MovieUpdateDto
  ): Promise<MovieDto> {
    const findedMovie = await this.moviesRepository.find({ id });

    if (!findedMovie) {
      throw new AppException("MOVIE_NOT_FOUND", { id: id.toString() });
    }

    await this.moviesRepository.update(id, {
      title,
      year,
      format,
      actors,
    });

    return (await this.moviesRepository.find({ id })) as MovieDto;
  }

  async getOne(id: string): Promise<MovieDto> {
    const findedMovie = await this.moviesRepository.find({ id });

    if (!findedMovie) {
      throw new AppException("MOVIE_NOT_FOUND", { id: id.toString() });
    }

    const actorsArray = findedMovie.actors?.map((actor) => {
      return {
        id: actor.id,
        name: actor.name,
        createdAt: actor.createdAt,
        updatedAt: actor.updatedAt,
      };
    });

    return { ...findedMovie, actors: actorsArray || [] };
  }

  async delete(id: string): Promise<number> {
    const findedMovie = await this.moviesRepository.find({ id });

    if (!findedMovie) {
      throw new AppException("MOVIE_NOT_FOUND", { id: id.toString() });
    }

    return await this.moviesRepository.delete(id);
  }

  async getAll(query: MovieQueryDto): Promise<MovieDto[] | null> {
    const movies = await this.moviesRepository.findAll(query);

    return movies;
  }

  async import(data: MovieImportDto): Promise<MovieDto[]> {
    const fileContent = this.moviesFileService.readFile(data);
    const parsedMovies = this.moviesFileService.parseMovieFile(fileContent);
    const savedMovies: MovieDto[] = [];
    const duplicates: string[] = [];

    for (const movie of parsedMovies) {
      const existedMovie = await this.moviesRepository.find({
        title: movie.title,
      });

      if (existedMovie) {
        duplicates.push(movie.title);
        continue;
      }

      const savedMovie = await this.moviesRepository.create(movie);
      const { actors, ...data } = savedMovie;
      savedMovies.push(data);
    }

    if (duplicates.length > 0 && savedMovies.length === 0) {
      throw new AppException("MOVIES_EXIST", { title: "NOT_UNIQUE" });
    }

    return savedMovies;
  }
}

export { MoviesService };
