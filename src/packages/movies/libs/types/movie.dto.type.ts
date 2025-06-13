import { type MovieFormat } from "./types";

type MovieDto = {
  id: string;
  title: string;
  year: number;
  format: MovieFormat;
  actors?: { id: string; name: string; createdAt: Date; updatedAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
};

export { type MovieDto };
