import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { HandType } from '@components/constants';
import { store } from '@store/progress';

import { Board } from '.';

const mockPlayerChoice = vi.fn();

vi.spyOn(store, 'setPlayerChoice').mockImplementation(mockPlayerChoice);

vi.useFakeTimers();

describe('Components: Board', () => {
  beforeEach(() => {
    mockPlayerChoice.mockReset();
  });

  it('should render sr-only header', () => {
    render(<Board />);

    expect(
      screen.getByRole('heading', { name: 'Choose a hand:', level: 2 })
    ).toBeVisible();
  });

  it('should render hand buttons', () => {
    render(<Board />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    Object.values(HandType).forEach((value) => {
      expect(screen.getByRole('button', { name: value })).toBeVisible();
    });
  });

  // TODO: uncomment when can figure out how to mock refs properly
  // it('should set expected ratio', () => {
  //   render(<Board />);

  //   expect(screen.getByRole('region')).toHaveStyle({ transform: 'scale(0.5)' });
  // });

  it('should fire setPlayerChoice store event', () => {
    render(<Board />);

    fireEvent.click(screen.getByRole('button', { name: 'scissors' }));

    expect(mockPlayerChoice).toHaveBeenCalledWith('scissors');
  });
});
