import { type Router } from "express";
import { UserApiRoute } from "./libs/enums/enums.js";
import { Status } from "../../libs/enums/enums.js";
import { type UsersService } from "./users.service.js";
import { type ResponseType } from "../../libs/types/types.js";
import { HttpCode } from "../../libs/exceptions/exceptions.js";
import { type UserDto, type UserSignUpDto } from "./libs/types/types.js";
import { userSignUpDtoSchema } from "./libs/schemas/schemas.js";

class UsersController {
  constructor(
    private readonly usersRouter: Router,
    private readonly usersService: UsersService
  ) {}

  signUp(): void {
    this.usersRouter.post<string, {}, ResponseType<UserDto>, UserSignUpDto>(
      UserApiRoute.SIGN_UP,
      async (request, response, next) => {
        try {
          const payload = userSignUpDtoSchema.parse(request.body);
          const user = await this.usersService.create(payload);

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

export { UsersController };
