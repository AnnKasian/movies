import { type z } from "zod";

import { type movieCreateDtoSchema } from "../schemas/schemas.js";

type MovieCreateDto = z.infer<typeof movieCreateDtoSchema>;

export { type MovieCreateDto };
