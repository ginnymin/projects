import clsx from 'clsx';
import type { FC, ButtonHTMLAttributes } from 'react';

import { HandType } from '@components/constants';

import { EmptyHand } from './EmptyHand';
import styles from './Hand.module.scss';
import { Icon } from './Icon';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  size?: 'default' | 'large';
  type: HandType | 'empty';
};

export const Hand: FC<Props> = ({
  className,
  size = 'large',
  type,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'relative flex items-center justify-center w-72 h-72 rounded-full',
        {
          'scale-[0.45] -m-20 md:scale-[0.8] md:-m-8 lg:scale-100 lg:m-0':
            size === 'large',
          'transition scale-[0.48] -m-16 hover:scale-[0.52] active:scale-[0.5]':
            size === 'default',
        },
        'before:content-[""] before:absolute before:inset-0 before:rounded-full before:border-transparent before:border-[32px]',
        styles[type],
        className
      )}
    >
      {type === 'empty' ? <EmptyHand /> : <Icon type={type} />}
    </button>
  );
};
