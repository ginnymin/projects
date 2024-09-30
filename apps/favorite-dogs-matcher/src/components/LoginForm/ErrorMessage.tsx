import { FC, HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

type Props = HTMLAttributes<HTMLParagraphElement>;

export const ErrorMessage: FC<Props> = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return null;
  }

  return (
    <p className="text-sm text-red-700">
      Oops! There was an error submitting the form. Please try again.
    </p>
  );
};
