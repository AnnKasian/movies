import express, { Router } from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import { LoggerService, ConfigService } from "./services/services.js";
import { createRouters } from "./routers.js";
import { testConnection } from "../database/models/index.js";
import { handleAuth, handleError } from "./libs/middlewares/middlewares.js";
import { ApiRoute } from "./libs/enums/api-route.enum.js";

config();

const app = express();
const router = Router();

const loggerService = new LoggerService();
const configService = ConfigService.instance;
await testConnection();

app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const [useRoutes, { usersRouter }] = createRouters();
useRoutes(router);

app.use(
  handleAuth(
    { usersService: usersRouter.modules.service },
    {
      omitRoutes: [ApiRoute.SESSIONS, ApiRoute.USERS],
    }
  )
);

const {
  app: { prefixGlobal },
} = configService.schema;

app.use(`/${prefixGlobal}`, router);
app.use(handleError(loggerService));

const server = app.listen(configService.schema.app.port, () => {
  loggerService.info(`Listening to the port: ${configService.schema.app.port}`);
});

const shutdownGracefully = () => {
  loggerService.info("Shutting down gracefully");
  server.close((error) => {
    if (error) {
      loggerService.error(`Error while closing server ${error}`);
      process.exit(1);
    }

    loggerService.info("Server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdownGracefully);
process.on("SIGINT", shutdownGracefully);
