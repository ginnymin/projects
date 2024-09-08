import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CountryProvider } from '@components/CountryProvider';

import { Search } from '.';

const mockSetRegion = jest.fn();
const mockSetSearch = jest.fn();

/* eslint-disable */
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    setRegion: mockSetRegion,
    setSearch: mockSetSearch,
  }),
}));
/* eslint-enable */

const SearchComponent = () => (
  <CountryProvider>
    <Search />
  </CountryProvider>
);

describe('Components: Search', () => {
  beforeEach(() => {
    mockSetRegion.mockClear();
    mockSetSearch.mockClear();
  });

  it('renders input', () => {
    render(<SearchComponent />);

    expect(
      screen.getByRole('textbox', { name: 'Search for a country' })
    ).toBeVisible();
  });

  it('calls setRegion and setSearch', async () => {
    render(<SearchComponent />);

    await userEvent.type(screen.getByRole('textbox'), 'united');

    await waitFor(
      () => {
        expect(mockSetRegion).toHaveBeenCalledWith(undefined);
        expect(mockSetSearch).toHaveBeenCalledWith('united');
      },
      { timeout: 1100 }
    );
  });

  it('resets the search input', async () => {
    render(<SearchComponent />);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    await userEvent.type(input, 'un');

    await waitFor(() => expect(mockSetSearch).toHaveBeenCalledWith('un'), {
      timeout: 1100,
    });

    await userEvent.clear(input);

    await waitFor(
      () => {
        expect(mockSetSearch).toHaveBeenNthCalledWith(2, undefined);
        expect(mockSetRegion).toHaveBeenCalledTimes(2);
      },
      {
        timeout: 1100,
      }
    );
  });
});
