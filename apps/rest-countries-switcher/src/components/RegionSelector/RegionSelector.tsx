'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import {
  useCallback,
  useContext,
  useMemo,
  type FC,
  type HTMLAttributes,
} from 'react';
import { HiChevronDown } from 'react-icons/hi';

import { useFetchCountries } from '@api/hooks';
import { CountryContext } from '@components/CountryProvider';

type Props = HTMLAttributes<HTMLElement> & {};

export const RegionSelector: FC<Props> = ({ className }) => {
  const { region, setRegion, setSearch } = useContext(CountryContext);

  const { data } = useFetchCountries('/all');

  const regions = useMemo(() => {
    return data?.reduce((array: string[], country) => {
      if (!array.includes(country.region)) {
        array.push(country.region);
      }
      return array;
    }, []);
  }, [data]);

  const handleChange = useCallback(
    (region: string) => {
      setRegion(region === 'all' ? undefined : region);
      setSearch(undefined);
    },
    [setRegion, setSearch]
  );

  return (
    <Listbox value={region} onChange={handleChange}>
      <ListboxButton
        className={clsx(
          'group flex justify-between items-center container-shadow container-shadow-focus px-5 py-4 min-w-[200px]',
          className
        )}
      >
        <span>{region ?? 'Filter by Region'}</span>
        <HiChevronDown
          className="size-5 fill-blue-dark dark:fill-white group-data-open:rotate-180 transition"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'container-shadow px-1 py-3 w-[var(--button-width)] [--anchor-gap:6px] focus:outline-hidden',
          'transition duration-100 ease-in data-leave:data-closed:opacity-0'
        )}
      >
        {regions?.map((region) => (
          <ListboxOption
            key={region}
            value={region}
            className={clsx(
              'cursor-pointer rounded-md py-1 px-5 text-sm select-none',
              'data-focus:bg-gray-200 data-selected:bg-gray-100',
              'dark:data-focus:bg-white/10 dark:data-selected:bg-white/5'
            )}
          >
            {region}
          </ListboxOption>
        ))}
        <ListboxOption
          value="all"
          className={clsx(
            'cursor-pointer rounded-md py-1 px-5 text-sm select-none',
            'data-focus:bg-gray-200 data-selected:bg-gray-100',
            'dark:data-focus:bg-white/15 dark:data-selected:bg-white/10'
          )}
        >
          All regions
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
};
