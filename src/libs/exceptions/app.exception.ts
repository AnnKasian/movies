class AppException extends Error {
  constructor(
    public readonly code: string,
    public readonly fields: Record<string, unknown>,
    message?: string
  ) {
    super(message);
  }
}

export { AppException };
