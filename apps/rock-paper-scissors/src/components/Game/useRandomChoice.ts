import { useEffect, useState, useSyncExternalStore } from 'react';

import { HandType } from '@components/constants';
import { store } from '@store/progress';

type Options = {
  pause?: boolean;
  delay?: number;
};

/**
 * Picks a random choice after a delay. Doesn't run if paused.
 *
 * @param pause - defaults to false
 * @param delay - defaults to 3 seconds
 */

export const useRandomChoice = ({ pause = false, delay = 3000 }: Options) => {
  const storeHouseChoice = useSyncExternalStore(
    store.subscribe,
    store.getProgress('houseChoice'),
    store.getServerProgress
  );

  const [choice, setChoice] = useState<HandType | undefined>();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!pause && storeHouseChoice === undefined) {
      const pick = () => {
        const randomIndex = Math.floor(Math.random() * 5);
        const choices = Object.values(HandType);
        return choices[randomIndex];
      };

      timeout = setTimeout(() => {
        const value = pick();
        setChoice(value);
        store.setHouseChoice(value);
      }, delay);
    }

    return () => {
      clearTimeout(timeout);
      setChoice(undefined);
    };
  }, [delay, pause, storeHouseChoice]);

  return storeHouseChoice ?? choice;
};
