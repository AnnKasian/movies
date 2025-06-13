import { type MovieFormat } from "./types";

type MovieResponse = {
  id: string;
  title: string;
  year: number;
  format: MovieFormat;
  createdAt: Date;
  updatedAt: Date;
  actors: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export { type MovieResponse };
