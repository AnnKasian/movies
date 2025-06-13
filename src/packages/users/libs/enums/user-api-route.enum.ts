const UserApiRoute = {
  SIGN_IN: "/",
  SIGN_UP: "/",
} as const;

type UserApiRoute = (typeof UserApiRoute)[keyof typeof UserApiRoute];

export { UserApiRoute };
