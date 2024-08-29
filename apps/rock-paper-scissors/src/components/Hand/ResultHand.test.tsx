import { render, screen } from '@testing-library/react';

import { HandType } from '@components/constants';

import { ResultHand } from '.';

describe('Components: ResultHand', () => {
  it('should render large size by default', () => {
    render(<ResultHand type={HandType.LIZARD} />);

    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toHaveClass(
      'scale-[0.45] -m-20'
    );
  });

  it('does not render winning container by default', () => {
    render(<ResultHand type={HandType.LIZARD} className="test-class" />);

    expect(screen.getByRole('button', { name: 'lizard' })).toHaveClass(
      'test-class'
    );
  });

  it('renders winning container', () => {
    render(<ResultHand type={HandType.LIZARD} winner className="test-class" />);

    const button = screen.getByRole('button', { name: 'lizard' });
    expect(button).not.toHaveClass('test-class');
    expect(button.parentElement).toHaveClass('test-class');
  });
});
