import { HandType, ResultType, isServer } from '@components/constants';

import { LocalStorage } from './LocalStorage';

type ProgressStorage = {
  playerChoice: HandType;
  houseChoice: HandType;
  result: ResultType;
};

const storage = isServer ? window.localStorage : undefined;
const localStorage = new LocalStorage<ProgressStorage>(storage);

let playerChoice = localStorage?.get('playerChoice') ?? undefined;
let houseChoice = localStorage?.get('houseChoice') ?? undefined;
let result = localStorage?.get('result') ?? undefined;

const subscribers = new Set<() => void>();

export const store = {
  getProgress:
    <K extends keyof ProgressStorage>(key: K) =>
    () =>
      (key === 'houseChoice'
        ? houseChoice
        : key === 'result'
        ? result
        : playerChoice) as ProgressStorage[K],

  // localStorage isn't available on the server, so always return initial state
  getServerProgress: () => undefined,

  setPlayerChoice: (value: HandType) => {
    playerChoice = value;
    localStorage?.set('playerChoice', value);
    emit();
  },
  setHouseChoice: (value: HandType) => {
    houseChoice = value;
    localStorage?.set('houseChoice', value);
    emit();
  },
  setResult: (value: ResultType) => {
    result = value;
    localStorage?.set('result', value);
    emit();
  },

  reset: () => {
    playerChoice = undefined;
    houseChoice = undefined;
    result = undefined;
    localStorage?.remove('playerChoice');
    localStorage?.remove('houseChoice');
    localStorage?.remove('result');
    emit();
  },

  // subscribe and unsubscribe from the store using callback
  subscribe: (callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
};

const emit = () => {
  subscribers.forEach((callback) => {
    callback();
  });
};
