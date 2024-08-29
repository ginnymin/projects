import { useEffect, useState, useSyncExternalStore } from 'react';

import { HandType, ResultType } from '@components/constants';
import { store } from '@store/progress';
import { store as score } from '@store/score';

const types = Object.values(HandType);

/**
 * Builds out results object to easily compare values.
 * - Scissors beats Paper
 * - Paper beats Rock
 * - Rock beats Lizard
 * - Lizard beats Spock
 * - Spock beats Scissors
 * - Scissors beats Lizard
 * - Paper beats Spock
 * - Rock beats Scissors
 * - Lizard beats Paper
 * - Spock beats Rock
 */
const resultMap = types.reduce<Record<HandType, HandType[]>>(
  (map, type, index) => {
    const nextIndex = (index + 1) % types.length;
    const nextNextIndex = (index + 2) % types.length;
    const nextValue = types[nextIndex];
    const nextNextValue = types[nextNextIndex];

    map[type] = [...(map[type] || []), nextValue];
    map[nextNextValue] = [...(map[nextNextValue] || []), type];

    return map;
  },
  {} as Record<HandType, HandType[]>
);

type Options = {
  playerChoice?: HandType;
  houseChoice?: HandType;
  delay?: number;
  pause?: boolean;
};

/**
 * Compares choices and returns the winner: player, house, or tie.
 * Doesn't run until both choices are defined.
 *
 * See {@linkcode resultMap}
 * @param playerChoice
 * @param houseChoice
 * @param delay - defaults to 3 seconds
 */
export const useResult = ({
  playerChoice,
  houseChoice,
  delay = 3000,
  pause = false,
}: Options) => {
  const storeResult = useSyncExternalStore(
    store.subscribe,
    store.getProgress('result'),
    store.getServerProgress
  );

  const [result, setResult] = useState<ResultType | undefined>();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!pause && storeResult === undefined) {
      const calculateResult = (p: HandType, h: HandType) => {
        if (p === h) {
          return ResultType.TIE;
        }

        if (resultMap[p].includes(h)) {
          return ResultType.WIN;
        }

        if (resultMap[h].includes(p)) {
          return ResultType.LOSE;
        }

        return ResultType.TIE;
      };

      if (playerChoice !== undefined && houseChoice !== undefined) {
        timeout = setTimeout(() => {
          const delayedResult = calculateResult(playerChoice, houseChoice);
          setResult(delayedResult);
          store.setResult(delayedResult);

          if (delayedResult === ResultType.WIN) {
            score.win();
          } else if (delayedResult === ResultType.LOSE) {
            score.loss();
          }
        }, delay);
      }
    }

    return () => {
      clearTimeout(timeout);
      setResult(undefined);
    };
  }, [delay, houseChoice, playerChoice, pause, storeResult]);

  return storeResult ?? result;
};
