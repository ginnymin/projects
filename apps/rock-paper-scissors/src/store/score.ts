import { isServer } from '@components/constants';

import { LocalStorage } from './LocalStorage';

const storage = isServer ? window.localStorage : undefined;
const localStorage = new LocalStorage<{ score: number }>(storage);

const subscribers = new Set<() => void>();
let score = localStorage?.get('score') ?? 0;

export const store = {
  getScore: () => score,
  getServerScore: () => 0, // localStorage isn't available on the server, so always return initial score

  win: () => {
    score++;
    emit();
  },

  loss: () => {
    if (score > 0) {
      score--;
      emit();
    }
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

  localStorage?.set('score', score);
};
