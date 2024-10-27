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
  variant?: 'default' | 'destructive';
};

export const Button: FC<Props> = ({
  children,
  className,
  size = 'medium',
  variant = 'default',
  ...props
}) => {
  const classes = clsx(
    'rounded-md whitespace-nowrap',
    {
      'element-focus text-white bg-slate-700 hover:bg-teal-900 active:bg-teal-700 disabled:bg-gray-400/50':
        props.kind === 'link' && variant === 'default',
      'element-focus text-white enabled:bg-slate-700 enabled:hover:bg-teal-900 enabled:active:bg-teal-700 disabled:bg-gray-400/50':
        props.kind !== 'link' && variant === 'default',
      'destructive-focus text-red-700 border border-red-700 hover:text-white hover:bg-red-700 active:bg-red-600 disabled:opacity-50':
        variant === 'destructive',
      'px-3 py-2 text-sm': size === 'medium',
      'px-6 py-3 font-semibold': size === 'large',
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
