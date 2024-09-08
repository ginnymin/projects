import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Components: Button', () => {
  it('renders button', () => {
    render(<Button>This is a test</Button>);

    expect(
      screen.getByRole('button', { name: 'This is a test' })
    ).toBeVisible();
  });

  it('renders link', () => {
    render(
      <Button kind="link" href="/test">
        This is a test
      </Button>
    );

    expect(screen.getByRole('link', { name: 'This is a test' })).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'This is a test' })
    ).toHaveAttribute('href', '/test');
  });

  it('renders medium size', () => {
    render(<Button>This is a test</Button>);

    expect(screen.getByRole('button', { name: 'This is a test' })).toHaveClass(
      'rounded text-sm'
    );
    expect(
      screen.getByRole('button', { name: 'This is a test' })
    ).not.toHaveClass('rounded-md');
  });

  it('renders large size', () => {
    render(<Button size="large">This is a test</Button>);

    expect(screen.getByRole('button', { name: 'This is a test' })).toHaveClass(
      'rounded-md'
    );
    expect(
      screen.getByRole('button', { name: 'This is a test' })
    ).not.toHaveClass('rounded text-sm');
  });
});
