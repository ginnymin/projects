/**
 * @jest-environment node
 */

import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('@api/getDogs', () => ({
  getDogsByIds: jest.fn().mockReturnValue([
    {
      age: 8,
      breed: 'Aussie',
      id: '1',
      img: 'https://img.com/1',
      name: 'Luna',
      zipCode: '09876',
    },
  ]),
}));

import Page from './page';

const resolveComponent = async (Component: typeof Page) => {
  const ComponentResolved = await Component({
    params: Promise.resolve({ id: '1' }),
  });
  return () => ComponentResolved;
};

describe('App router: /match', () => {
  it('renders', async () => {
    const Component = await resolveComponent(Page);

    render(<Component />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fetch Rescue' })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Congratulations! You have a match!',
      })
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
    expect(screen.getByText(/Hi,/)).toHaveTextContent(/Hi, my name is Luna/);
  });
});
