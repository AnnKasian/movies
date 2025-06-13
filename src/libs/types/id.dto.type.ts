import { type z } from "zod";

import { type idDtoSchema } from "../schemas/schemas.js";

type IdDto = z.infer<typeof idDtoSchema>;

export { type IdDto };
