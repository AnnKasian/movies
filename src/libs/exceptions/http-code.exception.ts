import { StatusCodes } from "http-status-codes";

const HttpCode = StatusCodes;

type HttpCode = (typeof HttpCode)[keyof typeof HttpCode];

export { HttpCode };
