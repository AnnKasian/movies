import { type z } from "zod";

import { type movieUpdateDtoSchema } from "../schemas/schemas.js";

type MovieUpdateDto = z.infer<typeof movieUpdateDtoSchema>;

export { type MovieUpdateDto };
