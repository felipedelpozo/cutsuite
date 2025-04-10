export type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;
