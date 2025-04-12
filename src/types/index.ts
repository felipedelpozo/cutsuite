export type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;

export type SearchParams = Record<string, string | string[] | undefined>;

export type PageSearchParams = {
  searchParams: Promise<SearchParams>;
};
