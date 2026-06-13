import { transformCountry } from './transformCountry';
import type { ApiCountryBase, ApiCountry } from './types';

export type FetcherPaths = '' | '/codes.alpha_3' | '/names.common' | '/region';

export async function fetcher<P extends FetcherPaths>([path, param]: [P, string?]) {
  const fields =
    path === '/codes.alpha_3'
      ? 'cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders'
      : 'cca3,name,flags,capital,population,region';

  const url = `https://api.restcountries.com/countries/v5${path}${param && path !== '/names.common' ? `/${param}` : ''}?fields=${fields}&limit=100${path === '/names.common' && param ? `&q=${param}` : ''}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_KEY}` },
  });

  // Handle errors
  if (!response.ok) {
    console.log('fetcher error', url, response);
    throw new Error(`Failed to fetch ${url}`);
  }

  const data = (await response.json()) as { data: { objects: ApiCountryBase[] | ApiCountry[] } };

  const transformedData = data.data.objects
    .map(transformCountry)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

  return transformedData;
}
