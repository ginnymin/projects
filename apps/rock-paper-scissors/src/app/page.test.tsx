import { render, screen } from '@testing-library/react';

import Page from './page';

describe('App router: Home', () => {
  it('renders board', () => {
    render(<Page />);

    expect(
      screen.getByRole('heading', { name: 'Choose a hand:' })
    ).toBeVisible();
  });
});
