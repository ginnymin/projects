import { render, screen } from '@testing-library/react';

import { HandType } from '@components/constants';

import { Hand } from './Hand';

describe('Components: Hand', () => {
  it('should render correct type', () => {
    render(<Hand type={HandType.LIZARD} />);

    expect(screen.getByRole('button', { name: HandType.LIZARD })).toBeVisible();
    expect(screen.getByRole('img', { name: HandType.LIZARD })).toBeVisible();
    expect(screen.queryByText('Pending...')).toBeNull();
  });

  it('should render empty hand', () => {
    render(<Hand type="empty" />);

    expect(screen.getByText('Pending...')).toBeVisible();
  });

  it('should render large size', () => {
    render(<Hand type={HandType.LIZARD} />);

    expect(screen.getByRole('button', { name: HandType.LIZARD })).toHaveClass(
      'scale-[0.45] -m-20'
    );
  });

  it('should render default size', () => {
    render(<Hand type={HandType.LIZARD} size="default" />);

    expect(screen.getByRole('button', { name: HandType.LIZARD })).toHaveClass(
      'scale-[0.48] -m-16'
    );
  });
});
