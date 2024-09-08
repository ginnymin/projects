export type ApiCountryBase = {
  capital?: string[];
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { official: string; common: string } };
  };
  population: number;
  region: string;
};

type ApiCountryDetails = {
  borders: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  subregion: string;
  tld: string[];
};

export type ApiCountry = ApiCountryBase & ApiCountryDetails;

export type Country = {
  capital: string | undefined;
  id: string;
  flag: {
    src: string;
    alt: string;
  };
  name: string;
  nativeName: string | undefined;
  population: number;
  region: string;
  borders?: string[];
  currencies?: string[];
  languages?: string[];
  subregion?: string;
  topLevelDomain?: string;
};
