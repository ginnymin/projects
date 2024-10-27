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
  hideLabel?: boolean;
  error?: boolean;
}

export const Input: FC<Props> = ({
  className,
  debounceDelay,
  error,
  hideLabel = false,
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
      {!hideLabel && (
        <label htmlFor={id} className="mb-1 text-sm">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {leading && (
          <HiOutlineSearch className="size-5 absolute left-3 top-[calc(50%-10px)]" />
        )}
        <input
          {...props}
          aria-label={hideLabel ? label : undefined}
          id={id}
          className={clsx(
            'rounded-md bg-neutral-100 w-full px-3 py-2 disabled:bg-gray-100',
            {
              'pl-10': leading !== undefined,
              'element-focus': !error,
              'destructive-focus border border-red-700': error,
            }
          )}
          onChange={debouncedOnChange}
        />
      </div>
    </div>
  );
};
