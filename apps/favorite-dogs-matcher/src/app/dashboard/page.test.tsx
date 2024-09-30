import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('@api/getDogs', () => ({
  getDogs: jest.fn().mockReturnValue({
    prev: undefined,
    next: undefined,
    total: 100,
    dogs: [
      {
        age: 8,
        breed: 'Aussie',
        id: '1',
        img: 'https://img.com/1',
        name: 'Luna',
        zipCode: '09876',
      },
    ],
  }),
}));

jest.mock('@api/getBreeds', () => ({
  getBreeds: jest
    .fn()
    .mockReturnValue(['Aussie', 'Border Collie', 'Blue Heeler', 'Corgi']),
}));

import Page from './page';

const resolveComponent = async (Component: typeof Page) => {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
};

describe('App router: /dashboard', () => {
  it('renders', async () => {
    const Component = await resolveComponent(Page);

    render(<Component />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fetch Rescue' })
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Luna' })
    ).toBeVisible();
  });
});
