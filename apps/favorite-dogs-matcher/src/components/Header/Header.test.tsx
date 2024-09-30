import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from '.';

const mockReplace = jest.fn();
const mockLogout = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock('@api/logout', () => ({
  logout: () => mockLogout() as void,
}));

describe('Components: Header', () => {
  it('should render', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fetch Rescue' })
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  it('calls logout', async () => {
    render(<Header />);

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(mockLogout).toHaveBeenCalledWith();
    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
