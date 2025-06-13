import { Router } from "express";
import { ApiRoute } from "./../../libs/enums/enums.js";

import { UsersController } from "./users.controller.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";
import { UsersSessionController } from "./users-session.controller.js";

class UsersRouter {
  static readonly USER_ROUTE = ApiRoute.USERS;
  static readonly SESSION_ROUTE = ApiRoute.SESSIONS;

  private router: Router;
  private sessionRouter: Router;
  private repository: UsersRepository;
  private controller: UsersController;
  private sessionController: UsersSessionController;
  private service: UsersService;

  constructor() {
    this.router = Router();
    this.sessionRouter = Router();

    this.repository = new UsersRepository();
    this.service = new UsersService(this.repository);
    this.controller = new UsersController(this.router, this.service);
    this.sessionController = new UsersSessionController(
      this.sessionRouter,
      this.service
    );
  }

  get instance() {
    return this.router;
  }

  get sessionInstance() {
    return this.sessionRouter;
  }

  get modules() {
    return {
      repository: this.repository,
      service: this.service,
    };
  }

  useRoutes() {
    this.controller.signUp();
    this.sessionController.signIn();
  }
}

export { UsersRouter };
