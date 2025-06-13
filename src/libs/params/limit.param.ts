const LimitParam = {
  DEFAULT: 20,
  MIN: 1,
  MAX: 100,
};

type LimitParam = (typeof LimitParam)[keyof typeof LimitParam];

export { LimitParam };
