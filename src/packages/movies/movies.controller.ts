import { type Router } from "express";
import { MovieApiRoute } from "./libs/enums/enums.js";
import { type IdDto, type ResponseType } from "../../libs/types/types.js";
import { type MoviesService } from "./movies.service.js";
import { Status } from "../../libs/enums/enums.js";
import { handleUpload } from "../../libs/middlewares/middlewares.js";
import { HttpCode, AppException } from "../../libs/exceptions/exceptions.js";
import {
  type MovieQueryDto,
  type MovieImportDto,
  type MovieCreateDto,
  type MovieUpdateDto,
  type MovieDto,
} from "./libs/types/types.js";
import {
  movieCreateDtoSchema,
  movieQueryDtoSchema,
  movieUpdateDtoSchema,
} from "./libs/schemas/schemas.js";

class MoviesController {
  constructor(
    private readonly moviesRouter: Router,
    private readonly moviesService: MoviesService
  ) {}

  post(): void {
    this.moviesRouter.post<string, {}, ResponseType<MovieDto>, MovieCreateDto>(
      MovieApiRoute.CREATE,
      async (request, response, next) => {
        try {
          const payload = movieCreateDtoSchema.parse(request.body);
          const movie = await this.moviesService.create(payload);
          response.status(HttpCode.OK).json({ data: movie, status: Status.OK });
        } catch (error) {
          next(error);
        }
      }
    );
  }

  patch(): void {
    this.moviesRouter.patch<
      string,
      IdDto,
      ResponseType<MovieDto>,
      MovieUpdateDto
    >(MovieApiRoute.UPDATE, async (request, response, next) => {
      try {
        const id = request.params.id;
        const payload = movieUpdateDtoSchema.parse(request.body);
        const movie = await this.moviesService.update(id, payload || {});

        response.status(HttpCode.OK).json({ data: movie, status: Status.OK });
      } catch (error) {
        next(error);
      }
    });
  }

  get(): void {
    this.moviesRouter.get<string, IdDto, ResponseType<MovieDto>>(
      MovieApiRoute.GET,
      async (request, response, next) => {
        try {
          const id = request.params.id;
          const movie = await this.moviesService.getOne(id);

          response.status(HttpCode.OK).json({ data: movie, status: Status.OK });
        } catch (error) {
          next(error);
        }
      }
    );
  }

  getAll(): void {
    this.moviesRouter.get<string, MovieQueryDto, ResponseType<MovieDto[]>>(
      MovieApiRoute.GET_ALL,
      async (request, response, next) => {
        try {
          const query = movieQueryDtoSchema.parse(request.query);
          const movies = await this.moviesService.getAll(query);
          response.status(HttpCode.OK).json({
            data: movies || [],
            meta: { total: movies?.length || 0 },
            status: Status.OK,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }

  delete(): void {
    this.moviesRouter.delete<string, IdDto, ResponseType<MovieDto[]>>(
      MovieApiRoute.DELETE,
      async (request, response, next) => {
        try {
          const id = request.params.id;
          await this.moviesService.delete(id);
          response.status(HttpCode.OK).json({ status: Status.OK });
        } catch (error) {
          next(error);
        }
      }
    );
  }

  import(): void {
    this.moviesRouter.post<
      string,
      {},
      ResponseType<MovieDto[]>,
      MovieImportDto
    >(
      MovieApiRoute.IMPORT,
      handleUpload.single("file"),
      async (request, response, next) => {
        try {
          if (!request.file) {
            throw new AppException("FILE_REQUIRED", { file: "REQUIRED" });
          }

          const payload: MovieImportDto = {
            file: request.file,
          };
          const movies = await this.moviesService.import(payload);

          response
            .status(HttpCode.OK)
            .json({ data: movies, status: Status.OK });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
export { MoviesController };
