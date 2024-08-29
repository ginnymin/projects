import { useSyncExternalStore } from 'react';

import { store } from '@store/progress';

import { useRandomChoice } from './useRandomChoice';
import { useResult } from './useResult';

export const useProgress = () => {
  const choice = useSyncExternalStore(
    store.subscribe,
    store.getProgress('playerChoice'),
    store.getServerProgress
  );

  const houseChoice = useRandomChoice({
    pause: choice === undefined,
  });

  const result = useResult({
    playerChoice: choice,
    houseChoice,
    pause: choice === undefined || houseChoice === undefined,
  });

  return {
    choice,
    houseChoice,
    result,
  };
};
