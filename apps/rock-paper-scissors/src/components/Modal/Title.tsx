import { DialogTitle, DialogTitleProps } from '@headlessui/react';
import clsx from 'clsx';

type Props = DialogTitleProps;

export const Title = ({ className, children, ...props }: Props) => {
  return (
    <DialogTitle
      {...props}
      className={clsx(
        'uppercase text-primary-dark font-bold text-3xl',
        className
      )}
    >
      {children}
    </DialogTitle>
  );
};
