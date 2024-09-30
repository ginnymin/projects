import { ButtonHTMLAttributes, FC } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@components/Button';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const SignInButton: FC<Props> = ({ disabled, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      type="submit"
      disabled={disabled || pending}
      size="large"
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  );
};
