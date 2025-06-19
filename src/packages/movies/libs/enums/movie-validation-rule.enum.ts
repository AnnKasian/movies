const MovieValidationRule = {
  TITLE_MIN: 1,
  YEAR_MIN: 1850,
  YEAR_MAX: new Date().getFullYear(),
} as const;

export { MovieValidationRule };
