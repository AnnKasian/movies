import { Op } from "@sequelize/core";
import { Actors } from "../../../database/models/actors.js";
import { MovieActors } from "../../../database/models/movie-actors.js";
import { type MovieFilters } from "./libs/types/types.js";

class MovieActorsRepository {
  private readonly actors = Actors;
  private readonly movieActors = MovieActors;

  async create(actors: string[], movieId: string): Promise<void> {
    for (const actorName of actors) {
      const [actor] = await this.actors.findOrCreate({
        where: { name: actorName.trim() },
        defaults: { name: actorName.trim() },
      });

      await this.movieActors.create({
        movieId,
        actorId: actor.id,
      });
    }
  }

  async findAll(actor?: string, search?: string): Promise<string[]> {
    const nameToSearch = actor ?? search;

    if (!nameToSearch) {
      return [];
    }

    const matchedActors = await this.actors.findAll({
      where: { name: { [Op.like]: `%${nameToSearch}%` } },
      attributes: ["id"],
    });

    const actorIds = matchedActors.map((actor) => actor.id);

    if (actorIds.length === 0) {
      return [];
    }

    const movieActorsIds = await this.movieActors.findAll({
      where: { actorId: { [Op.in]: actorIds } },
      attributes: ["movieId"],
    });

    return movieActorsIds.map((movieActor) => movieActor.movieId);
  }

  async update(actors: string[], movieId: string): Promise<void> {
    await this.movieActors.destroy({
      where: { movieId },
    });

    for (const actorName of actors) {
      const [actor] = await this.actors.findOrCreate({
        where: { name: actorName.trim() },
        defaults: { name: actorName.trim() },
      });

      await this.movieActors.create({
        movieId,
        actorId: actor.id,
      });
    }
  }

  async find({ id }: MovieFilters): Promise<Actors[]> {
    const actors = await this.movieActors.findAll({
      where: { movieId: id },
    });

    return await this.actors.findAll({
      where: { id: { [Op.in]: actors.map((actor) => actor.actorId) } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.movieActors.destroy({
      where: { movieId: id },
    });
  }
}

export { MovieActorsRepository };
