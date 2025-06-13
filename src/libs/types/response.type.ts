type ResponseType<
  D,
  F extends Record<string, unknown> = Record<string, unknown>,
  M extends Record<string, unknown> = Record<string, unknown>
> = {
  token?: string;
  data?: D;
  meta?: M;
  status: number;
  error?: {
    fields: F;
    code: string;
  };
};

export { type ResponseType };
