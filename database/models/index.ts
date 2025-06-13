import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { Users } from "./users.js";
import { Movies } from "./movies.js";
import { LoggerService } from "../../src/services/services.js";
import { Actors } from "./actors.js";
import { MovieActors } from "./movie-actors.js";

const loggerService = new LoggerService();

const sequelize = new Sequelize({
  dialect: SqliteDialect,

  models: [Users, Movies, Actors, MovieActors],
  storage: "./database/database.sqlite",
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    loggerService.info("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error: unknown) {
    loggerService.error(`Unable to connect to the database: ${String(error)}`);
  }
};

export { sequelize, testConnection };
