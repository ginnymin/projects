import { render, screen } from '@testing-library/react';

import Page from './page';

/* eslint-disable */
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-expect-error
    ...actual,
    useFormState: vi.fn().mockReturnValue([{}, '/action']),
    useFormStatus: vi.fn().mockReturnValue({ pending: false }),
  };
});
/* eslint-enable */

describe('App router: Login', () => {
  it('renders', () => {
    render(<Page />);

    const text = screen.getByText(/Sign in to get started/);

    expect(text).toHaveTextContent(
      'Welcome to Fetch Rescue! Sign in to get started.'
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByRole('button')).toBeVisible();
  });
});
