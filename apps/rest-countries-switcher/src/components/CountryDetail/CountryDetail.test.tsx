import { fireEvent, render, screen } from '@testing-library/react';

import { CountryDetail } from '.';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

vi.mock('@api/hooks', () => ({
  useFetchCountries: () => ({
    data: [
      { id: 'CAN', name: 'Canada' },
      { id: 'MEX', name: 'Mexico' },
    ],
  }),
}));

describe('Components: CountryDetail', () => {
  it('renders content', () => {
    render(
      <CountryDetail
        id="USA"
        capital="DC"
        flag={{
          src: 'usa.svg',
          alt: 'Stars and stripes',
        }}
        name="United States"
        nativeName="US"
        region="Americas"
        subregion="North America"
        population={300000000}
        topLevelDomain=".us"
        currencies={['US Dollar']}
        languages={['English', 'French', 'Spanish']}
        borders={['CAN', 'MEX']}
      />
    );

    expect(screen.getByRole('button', { name: 'Back' })).toBeVisible();
    expect(
      screen.getByRole('img', { name: 'Stars and stripes' })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: 'United States' })
    ).toBeVisible();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Native Name: US');
    expect(listItems[1]).toHaveTextContent('Population: 300,000,000');
    expect(listItems[2]).toHaveTextContent('Region: Americas');
    expect(listItems[3]).toHaveTextContent('Sub Region: North America');
    expect(listItems[4]).toHaveTextContent('Capital: DC');
    expect(listItems[5]).toHaveTextContent('Top Level Domain: .us');
    expect(listItems[6]).toHaveTextContent('Currencies: US Dollar');
    expect(listItems[7]).toHaveTextContent(
      'Languages: English, French, Spanish'
    );

    expect(screen.getByRole('link', { name: 'Canada' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Mexico' })).toBeVisible();
  });

  it('triggers router back', () => {
    render(
      <CountryDetail
        id="USA"
        capital="DC"
        flag={{
          src: 'usa.svg',
          alt: 'Stars and stripes',
        }}
        name="United States"
        nativeName="US"
        region="Americas"
        subregion="North America"
        population={300000000}
        topLevelDomain=".us"
        currencies={['US Dollar']}
        languages={['English', 'French', 'Spanish']}
        borders={['CAN', 'MEX']}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockBack).toHaveBeenCalledWith();
  });
});
