import { HandType, ResultType } from '@components/constants';

import { store } from './progress';

const mockCallback = jest.fn();

describe('Store: progress', () => {
  it('returns undefined initial values', () => {
    expect(store.getProgress('playerChoice')()).toBe(undefined);
    expect(store.getProgress('houseChoice')()).toBe(undefined);
    expect(store.getProgress('result')()).toBe(undefined);
  });

  it('sets playerChoice', () => {
    store.setPlayerChoice(HandType.LIZARD);
    expect(store.getProgress('playerChoice')()).toBe(HandType.LIZARD);
  });

  it('sets houseChoice', () => {
    store.setHouseChoice(HandType.PAPER);
    expect(store.getProgress('houseChoice')()).toBe(HandType.PAPER);
  });

  it('sets result', () => {
    store.setResult(ResultType.WIN);
    expect(store.getProgress('result')()).toBe(ResultType.WIN);
  });

  it('resets values', () => {
    expect(store.getProgress('playerChoice')()).toBe(HandType.LIZARD);
    expect(store.getProgress('houseChoice')()).toBe(HandType.PAPER);
    expect(store.getProgress('result')()).toBe(ResultType.WIN);

    store.reset();

    expect(store.getProgress('playerChoice')()).toBe(undefined);
    expect(store.getProgress('houseChoice')()).toBe(undefined);
    expect(store.getProgress('result')()).toBe(undefined);
  });

  it('subscribes and emits callback', () => {
    store.subscribe(mockCallback);

    store.setPlayerChoice(HandType.LIZARD);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    store.setHouseChoice(HandType.PAPER);

    expect(mockCallback).toHaveBeenCalledTimes(2);

    store.setResult(ResultType.WIN);

    expect(mockCallback).toHaveBeenCalledTimes(3);

    store.reset();

    expect(mockCallback).toHaveBeenCalledTimes(4);
  });

  it('returns serverScore', () => {
    expect(store.getServerProgress()).toBe(undefined);
  });
});
