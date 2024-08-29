import { act, renderHook } from '@testing-library/react';

import { HandType } from '@components/constants';
import { store } from '@store/progress';

import { useRandomChoice } from './useRandomChoice';

const mockMathRandom = jest.fn().mockReturnValue(0.5);
const mockSetHouseChoice = jest.fn();

jest.spyOn(global.Math, 'random').mockImplementation(mockMathRandom);

jest.useFakeTimers();

describe('Components: Game: useRandomChoice', () => {
  beforeEach(() => {
    act(() => store.reset());
    mockMathRandom.mockClear();
    mockSetHouseChoice.mockClear();
  });

  it('returns undefined initially', () => {
    const { result } = renderHook(() => useRandomChoice({}));

    expect(result.current).toBe(undefined);
  });

  it('returns store value', () => {
    store.setHouseChoice(HandType.LIZARD);

    const { result } = renderHook(() => useRandomChoice({}));

    expect(result.current).toBe(HandType.LIZARD);
  });

  it('returns expected result after delay', () => {
    const { result } = renderHook(() => useRandomChoice({ delay: 5000 }));

    expect(result.current).toBe(undefined);

    act(() => jest.advanceTimersByTime(4000));

    expect(result.current).toBe(undefined);

    act(() => jest.advanceTimersByTime(1000));

    expect(result.current).toBe(HandType.ROCK);
  });

  it('calls setHouseChoice', () => {
    const storeSpy = jest.spyOn(store, 'setHouseChoice');
    storeSpy.mockImplementation(mockSetHouseChoice);

    renderHook(() => useRandomChoice({}));

    act(() => jest.advanceTimersByTime(4000));

    expect(mockSetHouseChoice).toHaveBeenCalledWith('rock');

    storeSpy.mockRestore();
  });

  it('does not call Math.random or setHouseChoice when paused', () => {
    const storeSpy = jest.spyOn(store, 'setHouseChoice');
    storeSpy.mockImplementation(mockSetHouseChoice);

    renderHook(() => useRandomChoice({ pause: true }));

    act(() => jest.runAllTimers());

    expect(mockMathRandom).not.toHaveBeenCalled();
    expect(mockSetHouseChoice).not.toHaveBeenCalled();

    storeSpy.mockRestore();
  });
});
