const ApiRoute = {
  USERS: "/users",
  SESSIONS: "/sessions",
  MOVIES: "/movies",
} as const;

type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];

export { ApiRoute };
