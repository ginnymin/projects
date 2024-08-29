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
  variant?: 'primary' | 'secondary';
};

export const Button: FC<Props> = ({
  size = 'medium',
  variant = 'secondary',
  children,
  className,
  ...props
}) => {
  const classes = clsx(
    'uppercase rounded-lg whitespace-nowrap',
    {
      'px-10 py-1.5': size === 'medium',
      'text-lg px-14 py-2': size === 'large',
      'bg-white text-primary-dark hover:bg-slate-100 active:bg-slate-300':
        variant === 'primary',
      'border-2 border-white/50 hover:bg-white/5 active:bg-white/10':
        variant === 'secondary',
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
