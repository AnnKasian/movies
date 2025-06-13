const OffsetParam = {
  DEFAULT: 0,
  MIN: 0,
};

type OffsetParam = (typeof OffsetParam)[keyof typeof OffsetParam];

export { OffsetParam };
