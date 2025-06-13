const UserValidationRule = {
  PASSWORD_LENGTH: 8,
  PASSWORD_EMPTY: 1,
  NAME_LENGTH: 3,
  EMAIL_EMPTY: 1,
} as const;

export { UserValidationRule };
