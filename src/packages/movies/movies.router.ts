import { Router } from "express";
import { ApiRoute } from "../../libs/enums/enums.js";
import { MoviesController } from "./movies.controller.js";
import { MoviesService } from "./movies.service.js";
import { MoviesRepository } from "./movies.repository.js";

import { MoviesFileService } from "./movie-files.servise.js";

class MoviesRouter {
  static readonly ROUTE = ApiRoute.MOVIES;

  private router: Router;
  private repository: MoviesRepository;
  private controller: MoviesController;
  private fileService: MoviesFileService;
  private service: MoviesService;

  constructor() {
    this.router = Router();
    this.repository = new MoviesRepository();
    this.fileService = new MoviesFileService();
    this.service = new MoviesService(this.repository, this.fileService);
    this.controller = new MoviesController(this.router, this.service);
  }

  get instance() {
    return this.router;
  }

  get modules() {
    return {
      repository: this.repository,
      service: this.service,
      fileService: this.fileService,
    };
  }

  useRoutes() {
    this.controller.post();
    this.controller.patch();
    this.controller.get();
    this.controller.delete();
    this.controller.getAll();
    this.controller.import();
  }
}

export { MoviesRouter };
