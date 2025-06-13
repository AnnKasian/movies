import { z } from "zod";

import { ValidationMessage } from "../enums/enums.js";

const idDtoSchema = z.object({
  id: z.coerce
    .string({
      required_error: ValidationMessage.ID_REQUIRED,
    })
    .uuid(),
});

export { idDtoSchema };
