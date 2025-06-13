import { type Logger, createLogger, format, transports } from "winston";

class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.colorize({
          level: true,
        }),
        format.timestamp({ format: "YYYY.MM.DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
          return `[${level}] [${timestamp as string}]: ${message as string}`;
        })
      ),
      transports: [new transports.Console()],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

export { LoggerService };
