'use client';

import clsx from 'clsx';
import {
  ChangeEventHandler,
  useCallback,
  useContext,
  type FC,
  type HTMLAttributes,
} from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { CountryContext } from '@components/CountryProvider';

import { useDebounce } from './useDebounce';

type Props = HTMLAttributes<HTMLElement>;

export const Search: FC<Props> = ({ className }) => {
  const { setRegion, setSearch } = useContext(CountryContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value;

      if (value.trim() === '') {
        setSearch(undefined);
      } else {
        setSearch(value);
      }

      setRegion(undefined);
    },
    [setRegion, setSearch]
  );

  const debouncedChange = useDebounce(handleChange, 1000);

  return (
    <div
      className={clsx(
        'relative w-full md:max-w-[375px] lg:max-w-[475px]',
        className
      )}
    >
      <HiOutlineSearch className="absolute size-5 left-5 top-[calc(50%-10px)]" />
      <input
        className={clsx(
          'container-shadow container-shadow-focus px-12 sm:px-14 py-4 w-full'
        )}
        placeholder="Search for a country..."
        aria-label="Search for a country"
        onChange={debouncedChange}
      />
    </div>
  );
};
