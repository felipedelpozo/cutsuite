import type { SearchParams, Values } from 'nuqs';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsIsoDateTime,
} from 'nuqs/server';

export type PageSearchParams = {
  searchParams: SearchParams;
};

export const params = {
  date: parseAsIsoDateTime.withDefault(new Date()),
};

export const serialize = createSerializer(params);
export const getSearchParams = async (searchParams: SearchParams) =>
  createSearchParamsCache(params).parse(searchParams);

export type Filters = Values<typeof params>;
export type FilterKeys = keyof typeof params;
export type FilterValue = Filters[keyof Filters];
