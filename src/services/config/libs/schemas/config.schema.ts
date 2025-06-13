import { z } from "zod";
import { ConfigEnums } from "../enums/enums.js";

const configSchema = z.object({
  app: z.object({
    port: z.coerce.number().default(ConfigEnums.DEFAULT_PORT),
    nodeEnv: z.coerce.string().default("development"),
    prefixGlobal: z.coerce.string().default("api/v1"),
  }),
  jwt: z.object({
    secret: z.coerce.string().default("secret"),
    expiresIn: z.coerce.number().default(ConfigEnums.DEFAULT_EXPIRES_IN),
  }),
});

export { configSchema };
