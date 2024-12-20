import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any) => ReturnType<T>>(
  callback: T,
  delay?: number
) => {
  const timeout = useRef<NodeJS.Timeout>(undefined);
  const callbackRef = useRef(callback);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
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
