import { transformCountry } from './transformCountry';
import type { ApiCountryBase, ApiCountry, Country } from './types';

export type FetcherPaths = '/alpha' | '/all' | '/name' | '/region';

export async function fetcher(
  options: [Extract<FetcherPaths, '/alpha'>, string?]
): Promise<Country>;
export async function fetcher(
  options: [Exclude<FetcherPaths, '/alpha'>, string?]
): Promise<Country[]>;

export async function fetcher<P extends FetcherPaths>([path, param]: [
  P,
  string?
]) {
  const fields =
    path === '/alpha'
      ? 'cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders'
      : 'cca3,name,flags,capital,population,region';

  const url = `https://restcountries.com/v3.1${path}${
    param ? `/${param}` : ''
  }?fields=${fields}`;

  const response = await fetch(url);

  // Handle errors
  if (!response.ok) {
    console.log('fetcher error', url, response);
    throw new Error(`Failed to fetch ${url}`);
  }

  const data = (await response.json()) as ApiCountryBase[] | ApiCountry;

  const transformedData = Array.isArray(data)
    ? data
        .map(transformCountry)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    : transformCountry(data);

  return transformedData;
}
