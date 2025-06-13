import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignInDtoSchema = z.object({
  email: z
    .string({
      required_error: UserValidationMessage.NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.NAME_STRING,
    })
    .min(UserValidationRule.EMAIL_EMPTY, {
      message: UserValidationMessage.EMAIL_EMPTY,
    }),
  password: z
    .string({
      required_error: UserValidationMessage.PASSWORD_REQUIRED,
      invalid_type_error: UserValidationMessage.PASSWORD_STRING,
    })
    .min(UserValidationRule.PASSWORD_EMPTY, {
      message: UserValidationMessage.PASSWORD_LENGTH,
    }),
});

export { userSignInDtoSchema };
