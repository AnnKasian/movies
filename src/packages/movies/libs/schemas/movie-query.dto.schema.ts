import z from "zod";
import {
  LimitParam,
  OffsetParam,
  OrderParam,
  SortParam,
} from "../../../../libs/params/params.js";

const movieQueryDtoSchema = z.object({
  actor: z.string().optional(),
  title: z.string().optional(),
  search: z.string().optional(),
  limit: z.coerce
    .number()
    .min(LimitParam.MIN)
    .max(LimitParam.MAX)
    .default(LimitParam.DEFAULT),
  offset: z.coerce.number().min(OffsetParam.MIN).default(OffsetParam.DEFAULT),
  order: z.nativeEnum(OrderParam).default(OrderParam.ASC),
  sort: z.nativeEnum(SortParam).default(SortParam.ID),
});

export { movieQueryDtoSchema };
