import { render, screen } from '@testing-library/react';

import { Header } from '.';

describe('Components: Header', () => {
  it('should render', () => {
    render(<Header />);

    expect(
      screen.getByRole('img', { name: 'ROCK PAPER SCISSORS LIZARD SPOCK' })
    ).toBeVisible();
    expect(screen.getByText('Score')).toBeVisible();
    expect(screen.getByText('0')).toBeVisible();
  });
});
