import clsx from 'clsx';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { Logo } from '@components/Logo';
import { Score } from '@components/Score';

type Props = HTMLAttributes<HTMLElement>;

export const Header: FC<PropsWithChildren<Props>> = ({ className }) => {
  return (
    <header
      className={clsx(
        'flex justify-between items-center border-[3px] border-primary-outline rounded-lg md:rounded-xl px-3 py-3 md:px-5 md:py-4',
        className
      )}
    >
      <Logo className="max-h-14 md:max-h-none object-contain object-left -mb-1 ml-2.5 md:ml-0" />
      <Score />
    </header>
  );
};
