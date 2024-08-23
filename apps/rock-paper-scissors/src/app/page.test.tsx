import { render, screen } from '@testing-library/react';

import Page from './page';

describe('App router: Home', () => {
  it('renders', () => {
    render(<Page />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
