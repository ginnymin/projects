import { render, screen } from '@testing-library/react';

import { Footer } from '.';

describe('Components: Footer', () => {
  it('should render', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Rules' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Rules' })).toHaveAttribute(
      'href',
      '/rules'
    );
  });
});
