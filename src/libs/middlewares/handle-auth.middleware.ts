import { type RequestHandler } from "express";
import { type UsersService } from "../../packages/users/users.service.js";
import { AppException } from "../exceptions/exceptions.js";

const handleAuth = (
  modules: {
    usersService: UsersService;
  },
  options: {
    omitRoutes?: string[];
  } = {}
): RequestHandler => {
  const { usersService } = modules;
  const { omitRoutes } = options;

  return (request, _response, next) => {
    if (omitRoutes?.some((route) => request.url.includes(route))) {
      next();

      return;
    }

    const authorization = request.headers["authorization"];
    const token = authorization?.split(" ")[1];

    if (!token) {
      next(new AppException("FORMAT_ERROR", { token: "REQUIRED" }));

      return;
    }

    void usersService
      .getUserByToken(token)
      .then((user) => {
        request.user = user;
        next();
      })
      .catch((error: unknown) => {
        next(error);
      });
  };
};

export { handleAuth };
