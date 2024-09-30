import useSWR from 'swr';

import { getDogsByIds } from '@api/getDogs';

export const useFetchDog = (id: string) => {
  const data = useSWR(['/dogs', [id]], getDogsByIds, {});

  const { data: dogData, ...rest } = data;

  return {
    data: dogData?.[0],
    ...rest,
  };
};
