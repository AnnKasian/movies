import { movieCreateDtoSchema } from "./movie-create.dto.schema.js";

const movieUpdateDtoSchema = movieCreateDtoSchema.partial();

export { movieUpdateDtoSchema };
