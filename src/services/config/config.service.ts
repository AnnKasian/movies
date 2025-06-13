import { configSchema } from "./libs/schemas/schemas.js";
import { type ConfigSchema } from "./libs/types/types.js";

class ConfigService {
  readonly schema: ConfigSchema;
  private static service?: ConfigService;

  private constructor() {
    this.schema = configSchema.parse({
      app: {
        port: process.env["PORT"],
        nodeEnv: process.env["NODE_ENV"],
        prefixGlobal: process.env["PREFIX_GLOBAL"],
      },
      jwt: {
        secret: process.env["JWT_SECRET"],
        expiresIn: process.env["JWT_EXPIRES_IN"],
      },
    });
  }

  static get instance() {
    if (!this.service) {
      this.service = new ConfigService();
    }

    return this.service;
  }
}

export { ConfigService };
