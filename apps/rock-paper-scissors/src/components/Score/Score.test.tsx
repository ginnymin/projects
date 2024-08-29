import { render, screen } from '@testing-library/react';

import { store } from '@store/score';

import { Score } from '.';

describe('Components: Score', () => {
  it('should render', () => {
    render(<Score />);

    expect(
      screen.getByRole('heading', { name: 'Score', level: 2 })
    ).toBeVisible();
    expect(screen.getByText('0')).toBeVisible();
  });

  it('renders score from store', () => {
    store.win();
    store.win();

    render(<Score />);

    expect(screen.getByText('2')).toBeVisible();
  });
});
