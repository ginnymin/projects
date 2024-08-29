import { render, screen } from '@testing-library/react';

import { HandType, ResultType } from '@components/constants';

import { Result } from '.';

describe('Components: Result', () => {
  it('should render pending', () => {
    render(<Result choice={HandType.LIZARD} />);

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByText('Pending...')).toBeVisible();
  });

  it('should render pre-result', () => {
    render(<Result choice={HandType.LIZARD} houseChoice={HandType.SPOCK} />);

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'spock' })).toBeVisible();
    expect(screen.queryByText(/pending/)).toBeNull();
  });

  it('should render expected result', () => {
    render(
      <Result
        choice={HandType.LIZARD}
        houseChoice={HandType.SPOCK}
        result={ResultType.WIN}
      />
    );

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getByRole('button', { name: 'spock' })).toBeVisible();
    expect(screen.getByText('You win')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeVisible();
  });

  it('should render tie', () => {
    render(
      <Result
        choice={HandType.LIZARD}
        houseChoice={HandType.LIZARD}
        result={ResultType.TIE}
      />
    );

    expect(screen.getByText('You picked')).toBeVisible();
    expect(screen.getByText('The House picked')).toBeVisible();
    expect(screen.getAllByRole('button', { name: 'lizard' })).toHaveLength(2);
    expect(screen.getByText("It's a tie")).toBeVisible();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeVisible();
  });
});
