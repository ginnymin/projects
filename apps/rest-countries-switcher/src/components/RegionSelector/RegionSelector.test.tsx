import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CountryProvider,
  CountryProviderProps,
} from '@components/CountryProvider';

import { RegionSelector } from '.';

global.ResizeObserver = class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('@api/hooks', () => ({
  useFetchCountries: () => ({
    data: [
      { id: '1', region: 'Americas' },
      { id: '2', region: 'Europe' },
      { id: '3', region: 'Asia' },
      { id: '4', region: 'Africa' },
    ],
  }),
}));

const Component = (props: CountryProviderProps) => (
  <CountryProvider {...props}>
    <RegionSelector />
  </CountryProvider>
);

describe('Components: RegionSelector', () => {
  it('renders', () => {
    render(<Component />);

    expect(
      screen.getByRole('button', { name: 'Filter by Region' })
    ).toBeVisible();
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('renders listbox', async () => {
    render(<Component />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Filter by Region' })
    );

    expect(screen.getByRole('listbox')).toBeVisible();
  });

  it('renders options', async () => {
    render(<Component />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Filter by Region' })
    );

    const listbox = screen.getByRole('listbox');

    expect(within(listbox).getAllByRole('option')).toHaveLength(5);
    expect(
      within(listbox).getByRole('option', { name: 'Americas' })
    ).toBeVisible();
    expect(
      within(listbox).getByRole('option', { name: 'Europe' })
    ).toBeVisible();
    expect(within(listbox).getByRole('option', { name: 'Asia' })).toBeVisible();
    expect(
      within(listbox).getByRole('option', { name: 'Africa' })
    ).toBeVisible();
    expect(
      within(listbox).getByRole('option', { name: 'All regions' })
    ).toBeVisible();
  });

  it('renders selected option', async () => {
    render(<Component region="Europe" />);

    expect(screen.getByRole('button', { name: 'Europe' })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Europe' }));

    const listbox = screen.getByRole('listbox');

    expect(
      within(listbox).getByRole('option', { name: 'Europe', selected: true })
    ).toBeVisible();
  });

  it('changes selected value', async () => {
    render(<Component region="Americas" />);

    expect(screen.getByRole('button', { name: 'Americas' })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Americas' }));
    await userEvent.click(screen.getByRole('option', { name: 'Europe' }));

    expect(screen.queryByRole('button', { name: 'Americas' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Europe' })).toBeVisible();
  });
});
