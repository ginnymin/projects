'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, type FC, type HTMLAttributes } from 'react';

import { useFetchCountries } from '@api/hooks';
import { Country } from '@api/types';
import { Button } from '@components/Button';
import { Flag } from '@components/Flag';

type Props = HTMLAttributes<HTMLElement> & Country & {};

export const CountryDetail: FC<Props> = ({
  borders,
  capital,
  currencies,
  flag,
  languages,
  name,
  nativeName,
  population,
  region,
  subregion,
  topLevelDomain,
}) => {
  const router = useRouter();
  const { data: countries } = useFetchCountries('/all', undefined);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const borderCountries = useMemo(
    () =>
      countries !== undefined
        ? borders?.map((id) => {
            const country = countries.find((i) => i.id === id);
            return {
              id,
              name: country?.name,
            };
          })
        : undefined,
    [borders, countries]
  );

  return (
    <div>
      <Button onClick={handleBack} size="large">
        Back
      </Button>
      <div className="mt-8 md:flex md:gap-8 lg:gap-14">
        <div className="md:basis-5/12">
          <Flag {...flag} />
        </div>
        <div className="md:basis-7/12">
          <h2 className="text-xl font-bold mt-6 mb-4 lg:mb-6">{name}</h2>
          <ul className="lg:columns-2">
            <li className="leading-[1.75]">
              <strong className="font-semibold">Native Name</strong>:{' '}
              {nativeName}
            </li>
            <li className="leading-[1.75]">
              <strong className="font-semibold">Population</strong>:{' '}
              {new Intl.NumberFormat().format(population)}
            </li>
            <li className="leading-[1.75]">
              <strong className="font-semibold">Region</strong>: {region}
            </li>
            <li className="leading-[1.75]">
              <strong className="font-semibold">Sub Region</strong>: {subregion}
            </li>
            <li className="leading-[1.75] break-after-column">
              <strong className="font-semibold">Capital</strong>: {capital}
            </li>
            <li className="leading-[1.75] mt-6 lg:mt-0">
              <strong className="font-semibold">Top Level Domain</strong>:{' '}
              {topLevelDomain}
            </li>
            <li className="leading-[1.75]">
              <strong className="font-semibold">Currencies</strong>:{' '}
              {currencies?.join(', ')}
            </li>
            <li className="leading-[1.75]">
              <strong className="font-semibold">Languages</strong>:{' '}
              {languages?.join(', ')}
            </li>
          </ul>
          {borderCountries !== undefined && borderCountries.length > 0 && (
            <div className="lg:flex lg:items-baseline mt-6 lg:mt-8">
              <strong className="block font-semibold mb-4 lg:mr-3">
                Border Countries:
              </strong>
              <ul
                className={clsx(
                  'lg:flex-grow',
                  'gap-2.5 grid grid-cols-[repeat(auto-fit,minmax(100px,max-content))]'
                )}
              >
                {borderCountries.map(({ id, name }) => (
                  <li key={id}>
                    <Button
                      kind="link"
                      href={`/country/${id}`}
                      className="flex justify-center items-center h-full"
                    >
                      {name ?? id}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
