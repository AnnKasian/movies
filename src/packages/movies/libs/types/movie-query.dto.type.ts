import { type z } from "zod";

import { type movieQueryDtoSchema } from "../schemas/schemas.js";

type MovieQueryDto = z.infer<typeof movieQueryDtoSchema>;

export { type MovieQueryDto };
