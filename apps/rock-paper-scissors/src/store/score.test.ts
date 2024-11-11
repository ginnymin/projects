import { store } from './score';

const mockCallback = vi.fn();

describe('Store: score', () => {
  it('initializes at 0', () => {
    expect(store.getScore()).toBe(0);
  });

  it('records a win', () => {
    store.win();
    expect(store.getScore()).toBe(1);
  });

  it('records a loss', () => {
    store.loss();
    expect(store.getScore()).toBe(0);
  });

  it('subscribes and emits callback', () => {
    store.subscribe(mockCallback);

    store.win();

    expect(mockCallback).toHaveBeenCalledTimes(1);

    store.loss();

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('returns serverScore', () => {
    expect(store.getServerScore()).toBe(0);
  });
});
