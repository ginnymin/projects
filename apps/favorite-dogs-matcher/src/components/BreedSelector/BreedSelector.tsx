import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  type ComboboxProps,
} from '@headlessui/react';
import clsx from 'clsx';
import { ChangeEvent, useCallback, useMemo, useState, type FC } from 'react';
import { HiCheck } from 'react-icons/hi';

import { useFetchBreeds } from '@hooks/useFetchBreeds';

interface Props extends ComboboxProps<string, true> {
  selectedBreeds: string[];
  onChange: (breeds: string[]) => void;
}

export const BreedSelector: FC<Props> = ({
  selectedBreeds,
  onChange,
  ...props
}) => {
  const { data: breeds } = useFetchBreeds();

  const [query, setQuery] = useState('');

  const handleClose = useCallback(() => {
    setQuery('');
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const filteredBreeds = useMemo(
    () =>
      query === ''
        ? breeds
        : breeds?.filter((breed) => {
            return breed.toLowerCase().includes(query.toLowerCase());
          }),
    [query, breeds]
  );

  return (
    <Combobox
      {...props}
      immediate
      multiple
      value={selectedBreeds}
      onChange={onChange}
      onClose={handleClose}
    >
      <ComboboxInput
        aria-label="Filter by breed"
        onChange={handleChange}
        placeholder="Filter by breed..."
        className="rounded-sm w-44 px-4 py-2 element-focus bg-white disabled:bg-gray-100"
      />

      <ComboboxOptions
        anchor={{ to: 'bottom start', gap: 8, offset: -2 }}
        className="rounded-sm bg-white empty:invisible z-10"
      >
        {filteredBreeds?.map((breed) => (
          <ComboboxOption
            key={breed}
            value={breed}
            className="flex gap-1.5 items-center data-focus:bg-purple-100 py-2 pl-2 pr-4"
          >
            <HiCheck
              className={clsx({ invisible: !selectedBreeds.includes(breed) })}
            />{' '}
            {breed}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
