import type { Values } from 'nuqs';
import {
  createLoader,
  createSerializer,
  parseAsIsoDateTime,
} from 'nuqs/server';

export const params = {
  date: parseAsIsoDateTime.withDefault(new Date()),
};

export const serialize = createSerializer(params);
export const loadSearchParams = createLoader(params);

export type Filters = Values<typeof params>;
export type FilterKeys = keyof typeof params;
export type FilterValue = Filters[keyof Filters];
