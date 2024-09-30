import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DogsGrid } from '.';

const dogs = [
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
  {
    age: 10,
    breed: 'Border Collie',
    id: '3',
    img: 'https://img.com/3',
    name: 'Maggie',
    zipCode: '23456',
  },
  {
    age: 1,
    breed: 'Aussie',
    id: '4',
    img: 'https://img.com/4',
    name: 'Sadie',
    zipCode: '56789',
  },
];

const mockUseFetchDogs = jest.fn().mockReturnValue({
  data: { dogs, total: 100, prev: 'prev', next: 'next' },
});

jest.mock('@hooks/useFetchDogs', () => ({
  useFetchDogs: () => mockUseFetchDogs() as object,
}));

jest.mock('@hooks/useFetchBreeds', () => ({
  useFetchBreeds: () => ({
    data: ['Aussie', 'Border Collie', 'Blue Heeler', 'Corgi'],
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Components: DogsGrid', () => {
  it('renders grid, filters and pagination', () => {
    render(<DogsGrid />);

    expect(
      screen.getByRole('button', { name: 'Sort ascending by breed' })
    ).toBeEnabled();
    expect(
      screen.getByRole('combobox', { name: 'Filter by breed' })
    ).toBeEnabled();
    expect(screen.getByRole('grid')).toBeVisible();
    expect(screen.getAllByRole('gridcell')).toHaveLength(4);
    expect(screen.getByText('1 / 4')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('renders empty state', () => {
    mockUseFetchDogs.mockReturnValueOnce({
      data: { dogs: [], total: 0, prev: '', next: '' },
    });

    render(<DogsGrid />);

    expect(
      screen.getByText(
        "Looks like there aren't any matches for your search. Try changing or removing some filters to get more matches!"
      )
    ).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Previous' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('renders loading state', () => {
    mockUseFetchDogs.mockReturnValueOnce({ data: undefined });

    render(<DogsGrid />);

    expect(screen.getByText('Loading...')).toBeVisible();
    expect(screen.queryByRole('gridcell')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Sort ascending by breed' })
    ).toBeDisabled();
    expect(
      screen.getByRole('combobox', { name: 'Filter by breed' })
    ).toBeDisabled();
  });

  it('increments and decrements pagination', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('3 / 4')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Previous' }));

    expect(screen.getByText('2 / 4')).toBeVisible();
  });

  it('disables next button on last page', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('toggles sort', async () => {
    render(<DogsGrid />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Sort ascending by breed' })
    );

    expect(
      screen.getByRole('button', { name: 'Sort descending by breed' })
    ).toBeEnabled();

    await userEvent.click(
      screen.getByRole('button', { name: 'Sort descending by breed' })
    );

    expect(
      screen.getByRole('button', { name: 'Sort ascending by breed' })
    ).toBeEnabled();
  });

  it('selects dogs and shows selected favorites button', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByText('Luna'));
    await userEvent.click(screen.getByText('Sunny'));

    expect(
      screen.getAllByRole('button', { name: 'De-select as a favorite' })
    ).toHaveLength(2);

    expect(
      screen.getByRole('button', {
        name: 'View your favorites. Number of favorites: 2',
      })
    ).toBeEnabled();
  });

  it('de-selects dogs', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByText('Luna'));

    expect(
      screen.getByRole('button', { name: 'De-select as a favorite' })
    ).toBeVisible();

    await userEvent.click(screen.getByText('Luna'));

    expect(
      screen.queryByRole('button', { name: 'De-select as a favorite' })
    ).toBeNull();
  });

  it('de-selects dogs via the favorites dialog', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByText('Luna'));
    await userEvent.click(
      screen.getByRole('button', {
        name: 'View your favorites. Number of favorites: 1',
      })
    );
    await userEvent.click(screen.getAllByText('Luna')[1]);

    expect(
      screen.queryByRole('button', { name: /View your favorits/ })
    ).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'De-select as a favorite' })
    ).toBeNull();
  });

  it('reset selection via the favorites dialog', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByText('Luna'));
    await userEvent.click(screen.getByText('Sunny'));
    await userEvent.click(
      screen.getByRole('button', {
        name: 'View your favorites. Number of favorites: 2',
      })
    );
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(
      screen.queryByRole('button', { name: /View your favorits/ })
    ).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'De-select as a favorite' })
    ).toBeNull();
  });

  it('selects and removes breeds', async () => {
    render(<DogsGrid />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Aussie' }));
    await userEvent.click(
      screen.getByRole('option', { name: 'Border Collie' })
    );

    expect(screen.getByRole('button', { name: 'Aussie' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Border Collie' })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Aussie' }));

    expect(screen.queryByRole('button', { name: 'Aussie' })).toBeNull();
  });
});
