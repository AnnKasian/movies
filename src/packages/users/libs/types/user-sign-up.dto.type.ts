import { type z } from "zod";

import { type userSignUpDtoSchema } from "../schemas/schemas";

type UserSignUpDto = z.infer<typeof userSignUpDtoSchema>;

export { type UserSignUpDto };
