import { render, screen } from '@testing-library/react';

import { Logo } from '.';

describe('Components: Logo', () => {
  it('should render', () => {
    render(<Logo />);

    expect(
      screen.getByRole('img', { name: 'ROCK PAPER SCISSORS LIZARD SPOCK' })
    ).toBeVisible();
  });
});
