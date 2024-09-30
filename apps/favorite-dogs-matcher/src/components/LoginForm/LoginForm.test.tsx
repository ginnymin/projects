import { render, screen } from '@testing-library/react';

import { LoginForm } from '.';

/**
 * NOTE:
 * Testing is limited due to mismatch between the react versions between NextJS and Jest.
 * NextJS uses the canary version of React and the newer APIs and hooks are not supported in jest.
 */

const mockUseFormState = jest.fn().mockReturnValue([{}, '/action']);
const mockUseFormStatus = jest.fn().mockReturnValue({ pending: false });

/* eslint-disable */
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => mockUseFormState(),
  useFormStatus: () => mockUseFormStatus(),
}));
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
