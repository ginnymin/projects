import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Components: Button', () => {
  it('renders a button by default', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button', { name: 'Click' })).toBeVisible();
    expect(screen.getByRole('button')).toHaveClass('enabled:bg-slate-700');
  });

  it('renders a link', () => {
    render(
      <Button kind="link" href="/link">
        Click
      </Button>
    );

    expect(screen.getByRole('link', { name: 'Click' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Click' })).toHaveAttribute(
      'href',
      '/link'
    );
    expect(screen.getByRole('link')).toHaveClass('bg-slate-700');
  });

  it('renders destructive button', () => {
    render(<Button variant="destructive">Click</Button>);

    expect(screen.getByRole('button')).toHaveClass(
      'destructive-focus text-red-700'
    );
    expect(screen.getByRole('button')).not.toHaveClass('element-focus');
  });

  it('renders medium size by default', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('px-3 py-2 text-sm');
  });

  it('renders large size', () => {
    render(<Button size="large">Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 font-semibold');
  });
});
