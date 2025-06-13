import { Users } from "../../../database/models/users.js";
import { type UserItem, type UserFilters } from "./libs/types/types.js";

class UsersRepository {
  private readonly users: typeof Users = Users;

  async findBy(data: UserFilters): Promise<Users | null> {
    return await this.users.findOne({
      where: {
        ...(data.id && { id: data.id }),
        ...(data.email && { email: data.email }),
        ...(data.password && { password: data.password }),
      },
      attributes: { exclude: ["password"] },
    });
  }

  async create({ name, email, password }: UserItem): Promise<Users> {
    const user = await this.users.create({
      name,
      email,
      password,
    });

    const userToReturn = await user.reload({
      attributes: { exclude: ["password"] },
    });

    return userToReturn;
  }
}

export { UsersRepository };
