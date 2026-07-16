import useSWR from "swr";

import { type FetcherPaths, fetcher } from "./fetcher";
import type { Country } from "./types";

export const useFetchCountry = (path: Extract<FetcherPaths, "/codes.alpha_3">, param?: string) => {
  const data = useSWR<Country[]>([path, param], fetcher, {});

  return data;
};

export const useFetchCountries = (
  path: Exclude<FetcherPaths, "/codes.alpha_3">,
  param?: string,
) => {
  const data = useSWR<Country[]>([path, param], fetcher, {});

  return data;
};
