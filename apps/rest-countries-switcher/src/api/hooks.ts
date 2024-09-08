import useSWR from 'swr';

import { fetcher, type FetcherPaths } from './fetcher';
import { Country } from './types';

export const useFetchCountry = (
  path: Extract<FetcherPaths, '/alpha'>,
  param?: string
) => {
  const data = useSWR<Country>([path, param], fetcher, {});

  return data;
};

export const useFetchCountries = (
  path: Exclude<FetcherPaths, '/alpha'>,
  param?: string
) => {
  const data = useSWR<Country[]>([path, param], fetcher, {});

  return data;
};
