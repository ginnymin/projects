import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecipeList } from '.';

const mockGetAll = jest.fn().mockReturnValue(
  Promise.resolve([
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' },
    { id: 3, name: 'Recipe 3' },
  ])
);

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('@store/useStore', () => ({
  useStore: () => ({
    getAll: mockGetAll,
  }),
}));

describe('Components: RecipeList', () => {
  it('should render loading state', () => {
    render(<RecipeList />);

    expect(
      screen.getByRole('heading', { name: 'My smoothies', level: 2 })
    ).toBeVisible();
    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('should render recipes and filter', async () => {
    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeVisible();
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(
      screen.getByRole('textbox', { name: 'Filter smoothies by name' })
    ).toBeVisible();
  });

  it('should render empty state', async () => {
    mockGetAll.mockReturnValueOnce(Promise.resolve([]));

    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByText('No recipes yet!')).toBeVisible();
    });
  });

  it('should filter', async () => {
    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeVisible();
    });

    await userEvent.type(screen.getByRole('textbox'), 'recipe 2');

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByRole('link', { name: 'Recipe 2' })).toBeVisible();
      expect(screen.queryByRole('link', { name: 'Recipe 1' })).toBeNull();
      expect(screen.queryByRole('link', { name: 'Recipe 3' })).toBeNull();
    });
  });
});
