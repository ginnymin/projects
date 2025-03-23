import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface LinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'as'> {
  kind: 'link';
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  kind?: 'button';
}

type Props = (ButtonProps | LinkProps) & {
  size?: 'medium' | 'large';
  variant?: 'solid' | 'outline';
};

export const Button: FC<Props> = ({
  size = 'medium',
  variant = 'solid',
  children,
  className,
  ...props
}) => {
  const classes = clsx(
    'rounded-sm element-focus text-center element',
    {
      'px-4 py-2 text-sm': size === 'medium',
      'px-6 py-4': size === 'large',
      'bg-purple-900 text-white ': variant === 'solid',
      'bg-white font-semibold text-purple-900 border border-2 border-purple-900':
        variant === 'outline',
      'hover:enabled:bg-purple-800 active:enabled:bg-purple-700 disabled:bg-gray-500/50':
        variant === 'solid' && props.kind !== 'link',
      'hover:bg-purple-800 active:bg-purple-700':
        variant === 'solid' && props.kind === 'link',
      'hover:enabled:bg-slate-100 active:enabled:bg-slate-300 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300':
        variant === 'outline' && props.kind !== 'link',
      'hover:bg-slate-100 active:bg-slate-300':
        variant === 'outline' && props.kind === 'link',
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
