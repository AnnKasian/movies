import { UserDto } from "../src/packages/users/libs/types/types.js";

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}

export {};
