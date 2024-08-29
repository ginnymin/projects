import { act, renderHook } from '@testing-library/react';

import { HandType, ResultType } from '@components/constants';
import { store } from '@store/progress';

import { useProgress } from './useProgress';

type Options = {
  pause?: boolean;
};

const mockUseRandomChoice = jest.fn();
const mockUseResult = jest.fn();

jest.mock('./useRandomChoice', () => ({
  useRandomChoice: (p: Options) => mockUseRandomChoice(p) as jest.Mock,
}));

jest.mock('./useResult', () => ({
  useResult: (p: Options) => mockUseResult(p) as jest.Mock,
}));

describe('Components: Game: useProgress', () => {
  beforeEach(() => {
    act(() => store.reset());
    mockUseRandomChoice.mockClear();
    mockUseResult.mockClear();
  });

  it('returns initial value', () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current).toMatchObject({
      choice: undefined,
      houseChoice: undefined,
      result: undefined,
    });
  });

  it('returns expected values', () => {
    store.setPlayerChoice(HandType.LIZARD);
    mockUseRandomChoice.mockReturnValueOnce(HandType.SPOCK);
    mockUseResult.mockReturnValueOnce(ResultType.WIN);

    const { result } = renderHook(() => useProgress());

    expect(result.current).toMatchObject({
      choice: HandType.LIZARD,
      houseChoice: HandType.SPOCK,
      result: ResultType.WIN,
    });
  });

  it('pauses random choice', () => {
    renderHook(() => useProgress());

    expect(mockUseRandomChoice).toHaveBeenCalledWith({ pause: true });
  });

  it('does not pause random choice', () => {
    store.setPlayerChoice(HandType.LIZARD);
    renderHook(() => useProgress());

    expect(mockUseRandomChoice).toHaveBeenCalledWith({ pause: false });
  });

  it('pauses result', () => {
    renderHook(() => useProgress());

    expect(mockUseResult).toHaveBeenCalledWith({ pause: true });
  });

  it('does not pause result', () => {
    store.setPlayerChoice(HandType.LIZARD);
    mockUseRandomChoice.mockReturnValueOnce(HandType.SPOCK);
    renderHook(() => useProgress());

    expect(mockUseResult).toHaveBeenCalledWith({
      pause: false,
      houseChoice: 'spock',
      playerChoice: 'lizard',
    });
  });
});
