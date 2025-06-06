'use client';

import { useContext, type FC, type HTMLAttributes } from 'react';

import { useFetchCountries } from '@api/hooks';
import { Country } from '@components/Country';
import { CountryContext } from '@components/CountryProvider';
import { Skeleton } from '@components/Skeleton';

type Props = HTMLAttributes<HTMLElement> & {};

export const Countries: FC<Props> = () => {
  const { region, search } = useContext(CountryContext);

  const { data } = useFetchCountries(
    search !== undefined ? '/name' : region !== undefined ? '/region' : '/all',
    search !== undefined ? search : region !== undefined ? region : undefined
  );

  if (data === undefined) {
    return (
      <div className="grid gap-14 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <h2 className="sr-only">Loading...</h2>
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <ul className="grid gap-14 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
      {data?.map((country) => (
        <li key={country.id}>
          <Country
            id={country.id}
            name={country.name}
            region={country.region}
            population={country.population}
            capital={country.capital}
            flag={country.flag}
          />
        </li>
      ))}
    </ul>
  );
};
