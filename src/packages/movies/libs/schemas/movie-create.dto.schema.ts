import { z } from "zod";

import { MovieValidationMessage, MovieValidationRule } from "../enums/enums.js";
import { MovieFormat } from "../types/types.js";

const movieCreateDtoSchema = z.object({
  title: z
    .string({
      required_error: MovieValidationMessage.TITLE_REQUIRED,
      invalid_type_error: MovieValidationMessage.TITLE_STRING,
    })
    .min(MovieValidationRule.TITLE_MIN, {
      message: MovieValidationMessage.TITLE_LENGTH,
    })
    .refine((value) => value.trim().length > 0, {
      message: MovieValidationMessage.TITLE_EMPTY,
    }),
  year: z.coerce
    .number({
      required_error: MovieValidationMessage.YEAR_REQUIRED,
      invalid_type_error: MovieValidationMessage.YEAR_NUMBER,
    })
    .min(MovieValidationRule.YEAR_MIN, {
      message: MovieValidationMessage.YEAR_VALID,
    })
    .refine((value) => value <= new Date().getFullYear(), {
      message: MovieValidationMessage.YEAR_VALID,
    }),
  format: z.nativeEnum(MovieFormat, {
    required_error: MovieValidationMessage.FORMAT_REQUIRED,
    invalid_type_error: MovieValidationMessage.FORMAT_STRING,
  }),
  actors: z.array(
    z
      .string({
        required_error: MovieValidationMessage.ACTORS_REQUIRED,
        invalid_type_error: MovieValidationMessage.ACTORS_STRING,
      })
      .regex(/^[a-zA-Z\s-,.]+$/, {
        message: MovieValidationMessage.ACTORS_REGEX,
      })
  ),
});

export { movieCreateDtoSchema };
