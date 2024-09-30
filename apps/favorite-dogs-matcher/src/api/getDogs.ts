'use server';

import { fetcher, type FetcherPaths } from './fetcher';

interface ApiDogSearchResponse {
  resultIds: string[];
  total: number;
  next: string | undefined;
  prev: string | undefined;
}

interface ApiDog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Dog extends Omit<ApiDog, 'zip_code'> {
  zipCode: ApiDog['zip_code'];
}

/**
 *
 * Calls /dogs/search and then /dogs to get full data
 */
export const getDogs = async ([path, query]: [
  Extract<FetcherPaths, '/dogs/search'>,
  string | undefined
]) => {
  const searchResponse = await fetcher([path, query, undefined]);
  const searchData = (await searchResponse.json()) as ApiDogSearchResponse;

  const dogs = await getDogsByIds(['/dogs', searchData.resultIds]);

  const result = {
    dogs,
    next: searchData.next?.replace(`${path}?`, ''),
    prev: searchData.prev?.replace(`${path}?`, ''),
    total: searchData.total,
  };

  return result;
};

/**
 *
 * Calls /dogs with array of IDs to get full data for dogs
 */
export const getDogsByIds = async ([path, ids]: [
  Extract<FetcherPaths, '/dogs'>,
  string[]
]) => {
  const response = await fetcher([path, undefined, JSON.stringify(ids)]);

  const data = (await response.json()) as ApiDog[];

  const dogs = data.map(({ zip_code, ...dog }) => ({
    ...dog,
    zipCode: zip_code,
  }));

  return dogs;
};
