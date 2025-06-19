import { UserValidationRule } from "./user-validation-rule.enum";

const UserValidationMessage = {
  NAME_REQUIRED: "Name is required.",
  NAME_STRING: "Name should be a string.",
  NAME_EMPTY: "Name should not be empty.",
  NAME_LENGTH: `Name should be at least ${UserValidationRule.NAME_LENGTH} characters long.`,
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_STRING: "Email should be a string.",
  EMAIL_VALID: "Email should be valid.",
  EMAIL_EMPTY: "Email should not be empty.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_STRING: "Password should be a string.",
  PASSWORD_LENGTH: "Password should be at least 8 characters long.",
};

export { UserValidationMessage };
