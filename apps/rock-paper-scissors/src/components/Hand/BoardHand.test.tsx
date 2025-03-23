import { render, screen } from '@testing-library/react';

import { HandType } from '@components/constants';

import { BoardHand } from '.';

describe('Components: BoardHand', () => {
  it('should render default size', () => {
    render(<BoardHand type={HandType.LIZARD} index={0} />);

    expect(screen.getByRole('button', { name: 'lizard' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'lizard' })).toHaveClass(
      'absolute! scale-[0.48] -m-16'
    );
  });

  it('should attach expected styles', () => {
    render(
      <BoardHand type={HandType.LIZARD} index={0} style={{ opacity: 0.5 }} />
    );

    expect(screen.getByRole('button', { name: 'lizard' })).toHaveStyle({
      left: '-77.99999999999999px',
      top: '-224px',
      opacity: 0.5,
    });
  });
});
