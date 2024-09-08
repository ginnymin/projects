import { render, screen } from '@testing-library/react';

import {
  CountryProvider,
  CountryProviderProps,
} from '@components/CountryProvider';

import { Countries } from '.';

const mockUseFetchCountries = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@api/hooks', () => ({
  useFetchCountries: (...args: (string | undefined)[]) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    mockUseFetchCountries(...args),
}));

const Component = (props: CountryProviderProps) => (
  <CountryProvider {...props}>
    <Countries />
  </CountryProvider>
);

describe('Components: Countries', () => {
  beforeEach(() => {
    mockUseFetchCountries.mockClear();
    mockUseFetchCountries.mockReturnValue({
      data: [
        {
          id: 'USA',
          name: 'United States',
          population: 300000000,
          region: 'Americas',
          flag: {
            src: 'svg.svg',
            alt: 'Stars and stripes',
          },
        },
      ],
    });
  });

  it('renders', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: 'United States' })).toBeVisible();
  });

  it('renders loading', () => {
    mockUseFetchCountries.mockReturnValue({
      data: undefined,
    });

    render(<Component />);

    expect(screen.getByRole('heading', { name: 'Loading...' })).toBeVisible();
  });

  it('calls useFetchCountries hook with expected default args', () => {
    render(<Component />);

    expect(mockUseFetchCountries).toHaveBeenCalledWith('/all', undefined);
  });

  it('calls useFetchCountries hook with expected search args', () => {
    render(<Component search="uni" />);

    expect(mockUseFetchCountries).toHaveBeenCalledWith('/name', 'uni');
  });

  it('calls useFetchCountries hook with expected region args', () => {
    render(<Component region="Americas" />);

    expect(mockUseFetchCountries).toHaveBeenCalledWith('/region', 'Americas');
  });

  it('defaults to search when both search and region are provided', () => {
    render(<Component search="uni" region="Americas" />);

    expect(mockUseFetchCountries).toHaveBeenCalledWith('/name', 'uni');
    expect(mockUseFetchCountries).not.toHaveBeenCalledWith(
      '/region',
      'Americas'
    );
  });
});
