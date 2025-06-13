import { type z } from "zod";

import { type configSchema } from "../schemas/schemas.js";

type ConfigSchema = z.infer<typeof configSchema>;

export { type ConfigSchema };
