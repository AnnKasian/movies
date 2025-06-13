const OrderParam = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

type OrderParam = (typeof OrderParam)[keyof typeof OrderParam];

export { OrderParam };
