import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';

type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'as'> & {
  kind: 'link';
};

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  kind?: 'button';
};

type Props = (ButtonProps | LinkProps) & {
  size?: 'medium' | 'large';
};

export const Button: FC<Props> = ({
  size = 'medium',
  children,
  className,
  ...props
}) => {
  const classes = clsx(
    'text-center bg-white hover:bg-gray-50 active:bg-gray-100',
    'dark:bg-blue-dark dark:hover:bg-blue-dark dark:active:bg-blue-dark dark:hover:brightness-125 dark:active:brightness-150',
    {
      'rounded-md px-10 py-1.5 shadow-[0px_0px_6px_1px_rgba(0,0,0,0.2)] ':
        size === 'large',
    },
    {
      'rounded text-sm px-5 py-1.5 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.2)] ':
        size === 'medium',
    },
    className
  );

  if (props.kind === 'link') {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
