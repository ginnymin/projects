'use server';

import { fetcher } from './fetcher';

type ApiDogBreedsResponse = string[];

/**
 *
 * Fetches breeds
 */
export const getBreeds = async () => {
  const response = await fetcher(['/dogs/breeds', undefined, undefined]);
  const data = (await response.json()) as ApiDogBreedsResponse;

  return data;
};
