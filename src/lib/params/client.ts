import { createSerializer, parseAsIsoDateTime, type Values } from 'nuqs';

export const params = {
  date: parseAsIsoDateTime.withDefault(new Date()),
};

export const serialize = createSerializer(params);

export const loadSearchParams = params;

export type Filters = Values<typeof params>;
export type FilterKeys = keyof typeof params;
export type FilterValue = Filters[keyof Filters];
