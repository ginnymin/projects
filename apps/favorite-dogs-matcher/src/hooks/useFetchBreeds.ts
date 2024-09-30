import useSWR from 'swr';

import { getBreeds } from '@api/getBreeds';

export const useFetchBreeds = () => {
  const data = useSWR(['/dogs/breeds', undefined], getBreeds);

  return data;
};
