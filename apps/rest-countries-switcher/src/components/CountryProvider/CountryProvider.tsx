'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  type FC,
  type HTMLAttributes,
} from 'react';

type Context = {
  region: string | undefined;
  setRegion: Dispatch<SetStateAction<string | undefined>>;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
};

const defaultContext: Context = {
  region: undefined,
  setRegion: () => {},
  search: undefined,
  setSearch: () => {},
};

export const CountryContext = createContext<Context>(defaultContext);

type Props = HTMLAttributes<HTMLElement> &
  Partial<Pick<Context, 'region' | 'search'>>;

export const CountryProvider: FC<Props> = ({
  children,
  region: regionProp,
  search: searchProp,
}) => {
  const [region, setRegion] = useState<Context['region']>(regionProp);
  const [search, setSearch] = useState<Context['search']>(searchProp);

  const value = {
    region,
    setRegion,
    search,
    setSearch,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};
