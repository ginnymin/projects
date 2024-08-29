import { render, screen } from '@testing-library/react';

import { ComponentName } from '.';

describe('Components: ComponentName', () => {
  it('should render', () => {
    render(<ComponentName>This is a test</ComponentName>);

    expect(screen.getByText(/This is a test/)).toBeVisible();
  });
});
