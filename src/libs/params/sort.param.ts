const SortParam = {
  ID: "id",
  TITLE: "title",
  YEAR: "year",
  FORMAT: "format",
  ACTORS: "actors",
} as const;

type SortParam = (typeof SortParam)[keyof typeof SortParam];

export { SortParam };
