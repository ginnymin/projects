import { render, screen } from '@testing-library/react';

import { Flag } from '.';

describe('Components: Flag', () => {
  it('should render', () => {
    render(<Flag src="/svg.svg" alt="image" />);

    expect(screen.getByRole('img', { name: 'image' })).toBeVisible();
  });
});
