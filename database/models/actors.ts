import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  sql,
} from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  NotNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  tableName: "actors",
})
class Actors extends Model<
  InferAttributes<Actors>,
  InferCreationAttributes<Actors>
> {
  @Attribute({ type: DataTypes.UUID, defaultValue: sql.uuidV4 })
  @Unique
  @PrimaryKey
  @NotNull
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare name: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

export { Actors };
