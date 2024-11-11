import { act, renderHook } from '@testing-library/react';

import { HandType, ResultType } from '@components/constants';
import { store } from '@store/progress';
import { store as scoreStore } from '@store/score';

import { useResult } from './useResult';

const mockSetResult = vi.fn();
const mockWin = vi.fn();
const mockLoss = vi.fn();

vi.useFakeTimers();

vi.spyOn(scoreStore, 'win').mockImplementation(mockWin);
vi.spyOn(scoreStore, 'loss').mockImplementation(mockLoss);

describe('Components: Game: useResult', () => {
  beforeEach(() => {
    act(() => store.reset());
    mockSetResult.mockClear();
    mockWin.mockClear();
    mockLoss.mockClear();
  });

  describe('results', () => {
    const resultRender = async (props: Parameters<typeof useResult>[0]) => {
      const { result } = renderHook(() => useResult(props));

      await act(() => vi.runAllTimers());
      return result;
    };

    it('tie', async () => {
      const result = await resultRender({
        playerChoice: HandType.PAPER,
        houseChoice: HandType.PAPER,
      });

      expect(result.current).toEqual(ResultType.TIE);
    });

    it('scissors, paper', async () => {
      const result = await resultRender({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.PAPER,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('scissors, rock', async () => {
      const result = await resultRender({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.ROCK,
      });

      expect(result.current).toEqual(ResultType.LOSE);
    });

    it('scissors, spock', async () => {
      const result = await resultRender({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.SPOCK,
      });

      expect(result.current).toEqual(ResultType.LOSE);
    });

    it('scissors, lizard', async () => {
      const result = await resultRender({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.LIZARD,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('lizard, rock', async () => {
      const result = await resultRender({
        playerChoice: HandType.LIZARD,
        houseChoice: HandType.ROCK,
      });

      expect(result.current).toEqual(ResultType.LOSE);
    });

    it('lizard, spock', async () => {
      const result = await resultRender({
        playerChoice: HandType.LIZARD,
        houseChoice: HandType.SPOCK,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('lizard, paper', async () => {
      const result = await resultRender({
        playerChoice: HandType.LIZARD,
        houseChoice: HandType.PAPER,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('paper, rock', async () => {
      const result = await resultRender({
        playerChoice: HandType.PAPER,
        houseChoice: HandType.ROCK,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('paper, spock', async () => {
      const result = await resultRender({
        playerChoice: HandType.PAPER,
        houseChoice: HandType.SPOCK,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });

    it('spock', async () => {
      const result = await resultRender({
        playerChoice: HandType.SPOCK,
        houseChoice: HandType.ROCK,
      });

      expect(result.current).toEqual(ResultType.WIN);
    });
  });

  it('returns undefined', () => {
    const { result, rerender } = renderHook(
      (props: Parameters<typeof useResult>[0]) => useResult(props),
      { initialProps: {} }
    );

    expect(result.current).toBe(undefined);

    rerender({ playerChoice: HandType.LIZARD });

    expect(result.current).toBe(undefined);

    rerender({ houseChoice: HandType.LIZARD });

    expect(result.current).toBe(undefined);
  });

  it('returns store value', () => {
    store.setResult(ResultType.LOSE);

    const { result } = renderHook(() => useResult({}));

    expect(result.current).toBe(ResultType.LOSE);
  });

  it('returns expected result after delay', async () => {
    const { result } = renderHook(() =>
      useResult({
        delay: 5000,
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.PAPER,
      })
    );

    expect(result.current).toBe(undefined);

    await act(() => vi.advanceTimersByTime(4000));

    expect(result.current).toBe(undefined);

    await act(() => vi.advanceTimersByTime(1000));

    expect(result.current).toBe(ResultType.WIN);
  });

  it('calls setResult', async () => {
    const storeSpy = vi.spyOn(store, 'setResult');
    storeSpy.mockImplementation(mockSetResult);

    renderHook(() =>
      useResult({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.PAPER,
      })
    );

    await act(() => vi.advanceTimersByTime(4000));

    expect(mockSetResult).toHaveBeenCalledWith(ResultType.WIN);

    storeSpy.mockRestore();
  });

  it('calls score.win()', async () => {
    renderHook(() =>
      useResult({
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.PAPER,
      })
    );

    await act(() => vi.advanceTimersByTime(4000));

    expect(mockWin).toHaveBeenCalled();
    expect(mockLoss).not.toHaveBeenCalled();
  });

  it('calls score.loss()', async () => {
    renderHook(() =>
      useResult({
        playerChoice: HandType.PAPER,
        houseChoice: HandType.SCISSORS,
      })
    );

    await act(() => vi.advanceTimersByTime(4000));

    expect(mockLoss).toHaveBeenCalled();
    expect(mockWin).not.toHaveBeenCalled();
  });

  it('does not call setResult or score.win() when paused', async () => {
    const storeSpy = vi.spyOn(store, 'setResult');
    storeSpy.mockImplementation(mockSetResult);

    renderHook(() =>
      useResult({
        pause: true,
        playerChoice: HandType.SCISSORS,
        houseChoice: HandType.PAPER,
      })
    );

    await act(() => vi.runAllTimers());

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(mockWin).not.toHaveBeenCalled();

    storeSpy.mockRestore();
  });

  it('does not call callbacks when a choice is undefined', async () => {
    const storeSpy = vi.spyOn(store, 'setResult');
    storeSpy.mockImplementation(mockSetResult);

    renderHook(() => useResult({ playerChoice: HandType.SCISSORS }));

    await act(() => vi.runAllTimers());

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(mockWin).not.toHaveBeenCalled();
    expect(mockLoss).not.toHaveBeenCalled();

    storeSpy.mockRestore();
  });
});
