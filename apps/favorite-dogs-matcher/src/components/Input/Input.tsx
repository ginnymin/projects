'use client';

import clsx from 'clsx';
import {
  type ChangeEventHandler,
  type ReactNode,
  useCallback,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { useDebounce } from './useDebounce';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  debounceDelay?: number;
  id: string;
  label: string;
  leading?: ReactNode;
}

export const Input: FC<Props> = ({
  className,
  debounceDelay,
  id,
  label,
  leading,
  onChange,
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (onChange !== undefined) {
        onChange(event);
      }
    },
    [onChange]
  );

  const debouncedOnChange = useDebounce(handleChange, debounceDelay);

  return (
    <div className={clsx('flex flex-col', className)}>
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      <div className="relative w-full">
        {leading && (
          <HiOutlineSearch className="size-5 absolute left-5 top-[calc(50%-10px)]" />
        )}
        <input
          {...props}
          id={id}
          className={clsx(
            'rounded element-focus bg-white p-4 w-full disabled:bg-gray-100',
            {
              'pl-12 sm:pl-14': leading !== undefined,
            }
          )}
          onChange={debouncedOnChange}
        />
      </div>
    </div>
  );
};
