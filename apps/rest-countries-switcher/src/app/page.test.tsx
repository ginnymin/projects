import { render, screen } from '@testing-library/react';

import Page from './page';

const resolveComponent = async (Component: typeof Page) => {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
};

describe('App router: Home', () => {
  it('renders', async () => {
    const Component = await resolveComponent(Page);

    render(<Component />);

    expect(
      screen.getByRole('textbox', { name: 'Search for a country' })
    ).toBeVisible();

    expect(screen.getByRole('button')).toBeVisible();
  });
});
