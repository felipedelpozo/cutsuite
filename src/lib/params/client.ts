import { createSerializer, parseAsIsoDateTime, type Values } from 'nuqs';

export const params = {
  date: parseAsIsoDateTime.withDefault(new Date()),
};

export const serialize = createSerializer(params);

export const slugParsers = params;

export type SearchParams = Record<string, string | string[] | undefined>;

export type Filters = Values<typeof params>;
export type FilterKeys = keyof typeof params;
export type FilterValue = Filters[keyof Filters];
