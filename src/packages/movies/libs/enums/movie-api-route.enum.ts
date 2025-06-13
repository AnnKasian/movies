const MovieApiRoute = {
  CREATE: "/",
  DELETE: "/:id",
  UPDATE: "/:id",
  GET: "/:id",
  GET_ALL: "/",
  IMPORT: "/import",
} as const;

type MovieApiRoute = (typeof MovieApiRoute)[keyof typeof MovieApiRoute];

export { MovieApiRoute };
