const Status = {
  OK: 1,
  ERROR: 0,
} as const;

type Status = (typeof Status)[keyof typeof Status];

export { Status };
