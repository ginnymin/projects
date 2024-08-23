import { render, screen } from '@testing-library/react';

import { Logo } from '.';

describe('Components: Logo', () => {
  it('should render', () => {
    render(<Logo>This is a test</Logo>);

    expect(screen.getByText(/This is a test/)).toBeInTheDocument();
  });
});
