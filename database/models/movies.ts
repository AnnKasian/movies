import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  sql,
  NonAttribute,
} from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  NotNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  Table,
  BelongsToMany,
} from "@sequelize/core/decorators-legacy";
import { type MovieFormat } from "../../src/packages/movies/libs/enums/movie-format.emum.js";
import { Actors } from "./actors.js";

@Table({
  tableName: "movies",
})
class Movies extends Model<
  InferAttributes<Movies>,
  InferCreationAttributes<Movies>
> {
  @BelongsToMany(() => Actors, {
    through: "MovieActors",
    foreignKey: "movieId",
    otherKey: "actorId",
  })
  declare actors?: NonAttribute<Actors[]>;

  @Attribute({ type: DataTypes.UUID, defaultValue: sql.uuidV4 })
  @Unique
  @PrimaryKey
  @NotNull
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare title: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare year: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare format: MovieFormat;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

export { Movies };
