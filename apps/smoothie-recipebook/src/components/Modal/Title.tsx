import { DialogTitle, DialogTitleProps } from '@headlessui/react';
import clsx from 'clsx';

type Props = DialogTitleProps;

export const Title = ({ className, children, ...props }: Props) => {
  return (
    <DialogTitle {...props} className={clsx('font-bold text-2xl', className)}>
      {children}
    </DialogTitle>
  );
};
