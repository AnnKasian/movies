import { type ErrorRequestHandler } from "express";
import { type LoggerService } from "../../services/services.js";
import {
  AppException,
  ExceptionMessage,
  HttpCode,
} from "../exceptions/exceptions.js";
import { Status } from "../enums/enums.js";
import { ZodError } from "zod";

const handleError = (loggerPublisher: LoggerService): ErrorRequestHandler => {
  return (exception, _request, response, _next) => {
    if (exception instanceof AppException) {
      const { code, fields } = exception;

      response.status(HttpCode.OK).json({
        status: Status.ERROR,
        error: {
          fields: {
            fields,
          },
          code,
        },
      });

      return;
    } else if (exception instanceof ZodError) {
      const fields = exception.errors.reduce<Record<string, unknown>>(
        (fields, { path, message }) => ({
          ...fields,
          [path.join(".")]: message,
        }),
        {}
      );

      response.status(HttpCode.OK).json({
        status: Status.ERROR,
        error: {
          fields,
          code: "VALIDATION_ERROR",
        },
      });

      return;
    }

    const exceptionDetails =
      exception instanceof Error
        ? exception.stack ?? exception.message
        : JSON.stringify(exception);

    loggerPublisher.error(
      `${ExceptionMessage.UNKNOWN_EXCEPTION}\n${exceptionDetails}`
    );

    response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: Status.ERROR,
      message: ExceptionMessage.INTERNAL_SERVER_ERROR,
    });
  };
};

export { handleError };
