import jwt from "jsonwebtoken";
import { type Users } from "../../../database/models/users.js";
import {
  type UserFilters,
  type UserSignUpDto,
  type UserDto,
} from "./libs/types/types.js";

import { type UsersRepository } from "./users.repository.js";
import { ConfigService } from "../../services/services.js";
import { AppException } from "../../libs/exceptions/exceptions.js";

class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService = ConfigService.instance
  ) {}

  async getUserByToken(token: string): Promise<UserDto> {
    const { userId } = this.verifyToken(token);

    const foundUser = await this.usersRepository.findBy({ id: userId });

    if (!foundUser) {
      throw new AppException("AUTHENTICATION_FAILED", {
        email: "AUTHENTICATION_FAILED",
        password: "AUTHENTICATION_FAILED",
      });
    }

    return { ...foundUser, token };
  }

  async getUserByFilter(data: UserFilters): Promise<UserDto> {
    const foundUser = await this.usersRepository.findBy(data);

    if (!foundUser) {
      throw new AppException("AUTHENTICATION_FAILED", {
        email: "AUTHENTICATION_FAILED",
        password: "AUTHENTICATION_FAILED",
      });
    }

    const token = this.generateToken(foundUser);

    return { ...foundUser, token };
  }

  async getByFilter(data: UserFilters): Promise<UserDto> {
    if (data.token) {
      return await this.getUserByToken(data.token);
    }

    const user = await this.getUserByFilter(data);

    return user;
  }

  async create({
    name,
    email,
    password,
    confirmPassword,
  }: UserSignUpDto): Promise<UserDto> {
    const findedUser = await this.usersRepository.findBy({ email });

    if (findedUser) {
      throw new AppException("EMAIL_NOT_UNIQUE", {
        email: "NOT_UNIQUE",
      });
    }

    if (password !== confirmPassword) {
      throw new AppException("PASSWORDS_NOT_MATCH", {
        password: "NOT_MATCH",
      });
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      password,
    });

    const token = this.generateToken(newUser);

    return { ...newUser, token };
  }

  private verifyToken(token: string): { userId: string; email: string } {
    try {
      return jwt.verify(token, this.configService.schema.jwt.secret) as {
        userId: string;
        email: string;
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppException("TOKEN_EXPIRED", {
          token: "EXPIRED",
        });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppException("INVALID_TOKEN", {
          token: "INVALID",
        });
      }

      throw new AppException("TOKEN_VERIFICATION_FAILED", {
        token: "INVALID",
      });
    }
  }

  private generateToken(user: Users): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      this.configService.schema.jwt.secret,
      { expiresIn: `${this.configService.schema.jwt.expiresIn}h` }
    );
  }
}

export { UsersService };
