import { type z } from "zod";

import { type userSignInDtoSchema } from "../schemas/schemas";

type UserSignInDto = z.infer<typeof userSignInDtoSchema>;

export { type UserSignInDto };
