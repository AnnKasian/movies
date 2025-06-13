import { type QueryInterface, type DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("MovieActors", {
      actorId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      movieId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("MovieActors", ["movieId"]);
    await queryInterface.addIndex("MovieActors", ["actorId"]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("MovieActors");
  },
};
