import { render, screen } from '@testing-library/react';

import { HandType, ResultType } from '@components/constants';

import { Game } from '.';

const mockUseProgress = vi.fn();

vi.mock('./useProgress', () => ({
  useProgress: () => mockUseProgress() as typeof vi.fn,
}));

describe('Components: Game', () => {
  it('should render board by default', () => {
    mockUseProgress.mockReturnValue({
      choice: undefined,
      houseChoice: undefined,
      result: undefined,
    });

    render(<Game />);

    expect(
      screen.getByRole('heading', { name: 'Choose a hand:' })
    ).toBeVisible();
  });

  it('should render pending', () => {
    mockUseProgress.mockReturnValue({
      choice: HandType.LIZARD,
      houseChoice: undefined,
      result: undefined,
    });

    render(<Game />);

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByText('Pending...')).toBeVisible();
  });

  it('should render pre-result', () => {
    mockUseProgress.mockReturnValue({
      choice: HandType.LIZARD,
      houseChoice: HandType.SPOCK,
      result: undefined,
    });

    render(<Game />);

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'spock' })).toBeVisible();
    expect(screen.queryByText(/pending/)).toBeNull();
  });

  it('should render result', () => {
    mockUseProgress.mockReturnValue({
      choice: HandType.LIZARD,
      houseChoice: HandType.SPOCK,
      result: ResultType.WIN,
    });

    render(<Game />);

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'spock' })).toBeVisible();
    expect(screen.getByText('You win')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeVisible();
  });
});
