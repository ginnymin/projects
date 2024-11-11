import { fireEvent, render, screen, within } from '@testing-library/react';

import { Country } from '.';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Components: Country', () => {
  it('renders content', () => {
    render(
      <Country
        id="USA"
        capital="DC"
        flag={{
          src: 'usa.svg',
          alt: 'Stars and stripes',
        }}
        name="United States"
        region="Americas"
        population={300000000}
      />
    );

    expect(
      screen.getByRole('img', { name: 'Stars and stripes' })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: 'United States' })
    ).toBeVisible();
    expect(
      within(screen.getByRole('heading')).getByRole('link', {
        name: 'United States',
      })
    ).toHaveAttribute('href', '/country/USA');

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Population: 300,000,000');
    expect(listItems[1]).toHaveTextContent('Region: Americas');
    expect(listItems[2]).toHaveTextContent('Capital: DC');
  });

  it('triggers router push when clicked', () => {
    render(
      <Country
        id="USA"
        capital="DC"
        flag={{
          src: 'usa.svg',
          alt: 'Stars and stripes',
        }}
        name="United States"
        region="Americas"
        population={300000000}
      />
    );

    fireEvent.click(screen.getByRole('img'));

    expect(mockPush).toHaveBeenCalledWith('/country/USA');
  });
});
