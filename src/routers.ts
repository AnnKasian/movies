import { type Router } from "express";
import { MoviesRouter } from "./packages/movies/movies.router.js";
import { UsersRouter } from "./packages/users/users.router.js";

const createRouters = () => {
  const usersRouter = new UsersRouter();
  const moviesRouter = new MoviesRouter();

  const useRoutes = (router: Router): void => {
    usersRouter.useRoutes();
    moviesRouter.useRoutes();

    router.use(UsersRouter.USER_ROUTE, usersRouter.instance);
    router.use(UsersRouter.SESSION_ROUTE, usersRouter.sessionInstance);
    router.use(MoviesRouter.ROUTE, moviesRouter.instance);
  };

  return [
    useRoutes,
    {
      usersRouter,
      moviesRouter,
    },
  ] as const;
};

export { createRouters };
