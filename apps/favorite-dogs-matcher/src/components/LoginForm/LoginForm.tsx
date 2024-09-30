'use client';

import clsx from 'clsx';
import {
  type HTMLAttributes,
  type FC,
  useState,
  useCallback,
  ChangeEventHandler,
} from 'react';
import { useFormState } from 'react-dom';

import { login } from '@api/login';
import { Input } from '@components/Input';

import { ErrorMessage } from './ErrorMessage';
import { SignInButton } from './SignInButton';

type Props = HTMLAttributes<HTMLDivElement>;

export const LoginForm: FC<Props> = ({ className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [{ error }, formAction] = useFormState(login, {});

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name: inputName, value } = event.target;

      if (inputName === 'name') {
        setName(value);
        return;
      }

      if (inputName === 'email') {
        setEmail(value);
      }
    },
    []
  );

  return (
    <form
      className={clsx('flex flex-col gap-3', className)}
      action={formAction}
    >
      <Input
        id="fr-name"
        label="Name"
        placeholder="Your name"
        type="text"
        required
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <Input
        id="fr-email"
        label="Email address"
        placeholder="email@address.com"
        type="email"
        required
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <SignInButton className="mt-3" />
      {error && <ErrorMessage />}
    </form>
  );
};
