import { z } from "zod";

import { MovieValidationMessage, MovieValidationRule } from "../enums/enums.js";
import { MovieFormat } from "../types/types.js";

const movieCreateDtoSchema = z.object({
  title: z.string({
    required_error: MovieValidationMessage.TITLE_REQUIRED,
    invalid_type_error: MovieValidationMessage.TITLE_STRING,
  }),
  year: z.coerce
    .number({
      required_error: MovieValidationMessage.YEAR_REQUIRED,
      invalid_type_error: MovieValidationMessage.YEAR_NUMBER,
    })
    .min(MovieValidationRule.YEAR_MIN, {
      message: MovieValidationMessage.YEAR_VALID,
    })
    .max(MovieValidationRule.YEAR_MAX, {
      message: MovieValidationMessage.YEAR_VALID,
    }),
  format: z.nativeEnum(MovieFormat, {
    required_error: MovieValidationMessage.FORMAT_REQUIRED,
    invalid_type_error: MovieValidationMessage.FORMAT_STRING,
  }),
  actors: z.array(
    z.string({
      required_error: MovieValidationMessage.ACTORS_REQUIRED,
      invalid_type_error: MovieValidationMessage.ACTORS_STRING,
    })
  ),
});

export { movieCreateDtoSchema };
