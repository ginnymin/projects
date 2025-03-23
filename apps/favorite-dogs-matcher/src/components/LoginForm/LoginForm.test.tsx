import { render, screen } from '@testing-library/react';

import { LoginForm } from '.';

/**
 * NOTE:
 * Testing is limited due to mismatch between the react versions between NextJS and Jest.
 * NextJS uses the canary version of React and the newer APIs and hooks are not supported in jest.
 */

const mockUseFormState = vi.fn().mockReturnValue([{}, '/action']);
const mockUseFormStatus = vi.fn().mockReturnValue({ pending: false });

/* eslint-disable */
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-expect-error
    ...actual,
    useActionState: () => mockUseFormState(),
  };
});
/* eslint-enable */

/* eslint-disable */
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-expect-error
    ...actual,
    useFormStatus: () => mockUseFormStatus(),
  };
});
/* eslint-enable */

describe('Components: LoginForm', () => {
  it('should render', () => {
    render(<LoginForm />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  it('loading state', () => {
    mockUseFormStatus.mockReturnValueOnce({ pending: true });

    render(<LoginForm />);

    expect(
      screen.getByRole('button', { name: 'Signing in...' })
    ).toBeDisabled();
  });

  it('displays error message', () => {
    mockUseFormState.mockReturnValueOnce([{ error: true }, '/action']);

    render(<LoginForm />);

    expect(
      screen.getByText(
        'Oops! There was an error submitting the form. Please try again.'
      )
    ).toBeVisible();
  });
});
