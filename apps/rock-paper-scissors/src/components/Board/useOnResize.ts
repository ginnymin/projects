import { useEffect } from 'react';

/**
 * Adds an event listener for window resize events with an optional throttle delay.
 *
 * @param callback
 * @param delay - defaults to 0ms
 */
export const useOnResize = (callback: () => void, delay = 0) => {
  useEffect(() => {
    let throttled = false;

    const handleResize = () => {
      // Only run when not throttled
      if (throttled === false) {
        throttled = true;
        // Set a timeout to un-throttle
        setTimeout(() => {
          callback();
          throttled = false;
        }, delay);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback, delay]);
};
