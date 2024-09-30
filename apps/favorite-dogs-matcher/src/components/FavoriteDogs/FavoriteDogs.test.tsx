import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FavoriteDogs } from '.';

const mockRemove = jest.fn();
const mockGetMatch = jest.fn().mockReturnValue('09876');
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@api/getMatch', () => ({
  getMatch: () => mockGetMatch() as string,
}));

const selectedDogs = [
  {
    age: 8,
    breed: 'Aussie',
    id: '1',
    img: 'https://img.com/1',
    name: 'Luna',
    zipCode: '09876',
  },
  {
    age: 5,
    breed: 'Border Collie',
    id: '2',
    img: 'https://img.com/2',
    name: 'Sunny',
    zipCode: '12345',
  },
];

describe('Components: FavoriteDogs', () => {
  it('should render button', () => {
    render(<FavoriteDogs selectedDogs={selectedDogs} />);

    expect(
      screen.getByRole('button', {
        name: 'View your favorites. Number of favorites: 2',
      })
    ).toBeVisible();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders amd toggles dialog', async () => {
    render(<FavoriteDogs selectedDogs={selectedDogs} />);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('dialog')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders dialog content', async () => {
    render(<FavoriteDogs selectedDogs={selectedDogs} />);

    await userEvent.click(screen.getByRole('button'));

    expect(
      screen.getByRole('heading', { name: 'Your favorites' })
    ).toBeVisible();
    expect(screen.getByText(/You've selected 2 dogs so far. /)).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Find my match!' })
    ).toBeVisible();

    expect(screen.getByRole('heading', { name: 'Luna' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Sunny' })).toBeVisible();
  });

  it('calls onRemove', async () => {
    render(<FavoriteDogs selectedDogs={selectedDogs} onRemove={mockRemove} />);

    await userEvent.click(screen.getByRole('button'));

    await userEvent.click(screen.getByRole('heading', { name: 'Luna' }));

    expect(mockRemove).toHaveBeenCalledWith({
      age: 8,
      breed: 'Aussie',
      id: '1',
      img: 'https://img.com/1',
      name: 'Luna',
      zipCode: '09876',
    });
  });

  it('calls getMatch and routes to /match', async () => {
    render(<FavoriteDogs selectedDogs={selectedDogs} onRemove={mockRemove} />);

    await userEvent.click(screen.getByRole('button'));

    await userEvent.click(
      screen.getByRole('button', { name: 'Find my match!' })
    );

    expect(mockGetMatch).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/match/09876');
  });
});
