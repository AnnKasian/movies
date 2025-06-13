import { type Router } from "express";
import { UserApiRoute } from "./libs/enums/enums.js";
import { Status } from "../../libs/enums/enums.js";
import { type UsersService } from "./users.service.js";
import { type ResponseType } from "../../libs/types/types.js";
import { HttpCode } from "../../libs/exceptions/exceptions.js";
import { type UserDto, type UserSignInDto } from "./libs/types/types.js";
import { userSignInDtoSchema } from "./libs/schemas/schemas.js";

class UsersSessionController {
  constructor(
    private readonly usersRouter: Router,
    private readonly usersService: UsersService
  ) {}

  signIn(): void {
    this.usersRouter.post<string, {}, ResponseType<UserDto>, UserSignInDto>(
      UserApiRoute.SIGN_IN,
      async (request, response, next) => {
        try {
          const payload = userSignInDtoSchema.parse(request.body);
          const user = await this.usersService.getByFilter(payload);
          response
            .status(HttpCode.OK)
            .json({ token: user.token, status: Status.OK });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export { UsersSessionController };
