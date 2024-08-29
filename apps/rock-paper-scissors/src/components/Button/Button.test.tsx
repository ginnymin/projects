import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Components: Button', () => {
  it('renders a button by default', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button', { name: 'Click' })).toBeVisible();
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
  });

  it('renders secondary button by default', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('border-2 border-white/50 ');
    expect(screen.getByRole('button')).not.toHaveClass(
      'bg-white text-primary-dark'
    );
  });

  it('renders primary button', () => {
    render(<Button variant="primary">Click</Button>);

    expect(screen.getByRole('button')).toHaveClass(
      'bg-white text-primary-dark'
    );
    expect(screen.getByRole('button')).not.toHaveClass(
      'border-2 border-white/50 '
    );
  });

  it('renders medium size by default', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('px-10 py-1.5');
    expect(screen.getByRole('button')).not.toHaveClass('text-lg px-14 py-2 ');
  });

  it('renders large size', () => {
    render(<Button size="large">Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('text-lg px-14 py-2 ');
    expect(screen.getByRole('button')).not.toHaveClass('px-10 py-1.5');
  });
});
