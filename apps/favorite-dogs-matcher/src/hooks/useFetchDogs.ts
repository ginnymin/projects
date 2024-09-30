import useSWR from 'swr';

import { getDogs } from '@api/getDogs';

interface FilterOptions {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
}

export const useFetchDogs = (
  options?: FilterOptions,
  paginationOptions?: string
) => {
  const queryParams = new URLSearchParams(paginationOptions ?? '');

  if (options !== undefined) {
    (
      Object.entries(options) as [string, string[] | string | undefined][]
    ).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          queryParams.append(key, v);
        });
      } else if (val !== undefined) {
        queryParams.set(key, val);
      }
    });
  }

  const data = useSWR(['/dogs/search', queryParams.toString()], getDogs, {});

  return data;
};
