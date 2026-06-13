import { ApiCountryBase, ApiCountry, Country } from './types';

export const transformCountry = (country: ApiCountryBase | ApiCountry) => {
  const base: Country = {
    id: country.codes.alpha_3,
    capital: country.capitals?.[0]?.name,
    flag: {
      src: country.flag.url_svg ?? country.flag.url_png,
      alt: country.flag.emoji,
    },
    name: country.names.common,
    nativeName:
      country.names.native !== undefined
        ? Object.values(country.names.native)[0]?.common
        : undefined,
    population: country.population,
    region: country.region,
  };

  if ('tlds' in country) {
    const details: Country = {
      ...base,
      borders: country.borders,
      currencies:
        country.currencies !== undefined
          ? Object.values(country.currencies).map((c) => c.name)
          : undefined,
      languages: country.languages !== undefined ? country.languages.map((l) => l.name) : undefined,
      subregion: country.subregion,
      topLevelDomain: country.tlds[0],
    };

    return details;
  }

  return base;
};
