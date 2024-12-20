import { useCallback, useRef } from 'react';

/**
 *
 * @param callback A callback to debounce
 * @param delay Delay for the debounce in ms. If not provided, callback will not be debounced.
 * @returns Debounced callback
 *
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any) => ReturnType<T>>(
  callback: T,
  delay?: number
) => {
  const timeout = useRef<NodeJS.Timeout>(undefined);
  const callbackRef = useRef(callback);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (delay === undefined) {
        callbackRef.current(...args);
        return;
      }

      if (timeout.current === undefined) {
        timeout.current = setTimeout(() => {
          callbackRef.current(...args);
          clearTimeout(timeout.current);
          timeout.current = undefined;
        }, delay);
      }
    },
    [delay]
  );

  return debouncedCallback;
};
