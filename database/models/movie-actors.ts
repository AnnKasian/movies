import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  NotNull,
  CreatedAt,
  UpdatedAt,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  tableName: "MovieActors",
})
class MovieActors extends Model<
  InferAttributes<MovieActors>,
  InferCreationAttributes<MovieActors>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  declare movieId: string;

  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  declare actorId: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

export { MovieActors };
