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
  tableName: "users",
})
class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  @Attribute({ type: DataTypes.UUID, defaultValue: sql.uuidV4 })
  @PrimaryKey
  @Unique
  @NotNull
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

export { Users };
