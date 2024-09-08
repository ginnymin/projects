import { ApiCountryBase, ApiCountry, Country } from './types';

export const transformCountry = (country: ApiCountryBase | ApiCountry) => {
  const base: Country = {
    id: country.cca3,
    capital: country.capital?.[0],
    flag: {
      src: country.flags.svg,
      alt: country.flags.alt,
    },
    name: country.name.common,
    nativeName:
      country.name.nativeName !== undefined
        ? Object.values(country.name.nativeName)[0]?.common
        : undefined,
    population: country.population,
    region: country.region,
  };

  if ('tld' in country) {
    const details: Country = {
      ...base,
      borders: country.borders,
      currencies:
        country.currencies !== undefined
          ? Object.values(country.currencies).map((c) => c.name)
          : undefined,
      languages:
        country.languages !== undefined
          ? Object.values(country.languages)
          : undefined,
      subregion: country.subregion,
      topLevelDomain: country.tld[0],
    };

    return details;
  }

  return base;
};
