const MovieFormat = {
  VHS: "VHS",
  DVD: "DVD",
  BluRay: "BluRay",
} as const;

type MovieFormat = (typeof MovieFormat)[keyof typeof MovieFormat];

export { MovieFormat };
