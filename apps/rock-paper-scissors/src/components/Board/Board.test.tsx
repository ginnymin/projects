import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { HandType } from '@components/constants';
import { store } from '@store/progress';

import { Board } from '.';

let times = 0;

const mockPlayerChoice = jest.fn();

const mockRef = (val: number | { clientWidth: number }) => {
  return {
    current: val,
  };
};

jest.spyOn(React, 'useRef').mockImplementation((val?: number | null) => {
  if (val === null) {
    times++;
  }

  return typeof val === 'number'
    ? mockRef(val)
    : mockRef({ clientWidth: times > 1 ? 82.25 : 164.5 });
});

jest.spyOn(store, 'setPlayerChoice').mockImplementation(mockPlayerChoice);

jest.useFakeTimers();

describe('Components: Board', () => {
  beforeEach(() => {
    mockPlayerChoice.mockReset();
    times = 0;
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
