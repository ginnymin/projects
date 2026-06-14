export type ApiCountryBase = {
  capitals?: { name: string }[];
  codes: { alpha_3: string };
  flag: {
    url_png: string;
    url_svg: string;
    emoji: string;
  };
  names: {
    common: string;
    official: string;
    native?: { [key: string]: { official: string; common: string } };
  };
  population: number;
  region: string;
};

type ApiCountryDetails = {
  borders: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { name: string }[];
  subregion: string;
  tlds: string[];
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
