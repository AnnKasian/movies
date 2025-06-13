import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignUpDtoSchema = z.object({
  name: z
    .string({
      required_error: UserValidationMessage.NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.NAME_STRING,
    })
    .min(UserValidationRule.NAME_LENGTH, {
      message: UserValidationMessage.NAME_EMPTY,
    }),
  email: z
    .string({
      required_error: UserValidationMessage.EMAIL_REQUIRED,
      invalid_type_error: UserValidationMessage.EMAIL_STRING,
    })
    .email({ message: UserValidationMessage.EMAIL_VALID }),
  password: z
    .string({
      required_error: UserValidationMessage.PASSWORD_REQUIRED,
      invalid_type_error: UserValidationMessage.PASSWORD_STRING,
    })
    .min(UserValidationRule.PASSWORD_LENGTH, {
      message: UserValidationMessage.PASSWORD_LENGTH,
    }),
  confirmPassword: z
    .string({
      required_error: UserValidationMessage.PASSWORD_REQUIRED,
      invalid_type_error: UserValidationMessage.PASSWORD_STRING,
    })
    .min(UserValidationRule.PASSWORD_LENGTH, {
      message: UserValidationMessage.PASSWORD_LENGTH,
    }),
});

export { userSignUpDtoSchema };
