import { MovieValidationRule } from "./movie-validation-rule.enum";

const MovieValidationMessage = {
  TITLE_REQUIRED: "Title is required.",
  TITLE_STRING: "Title should be a string.",
  TITLE_EMPTY: "Title should not be empty.",
  TITLE_LENGTH: `Title should be at least ${MovieValidationRule.TITLE_MIN} characters long.`,
  YEAR_REQUIRED: "Year is required.",
  YEAR_NUMBER: "Year should be a number.",
  YEAR_VALID: `Invalid year. Valid range is ${MovieValidationRule.YEAR_MIN} - ${MovieValidationRule.YEAR_MAX}.`,
  FORMAT_REQUIRED: "Format is required.",
  FORMAT_STRING: "Format should be a string.",
  ACTORS_REQUIRED: "Authors is required.",
  ACTORS_STRING: "Authors should be a string.",
  ACTORS_REGEX:
    "Authors should be a string with only letters, spaces and special characters like - , .",
};

export { MovieValidationMessage };
