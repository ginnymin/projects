import clsx from 'clsx';
import type { FC, HTMLAttributes } from 'react';

import { Button } from '@components/Button';

type Props = HTMLAttributes<HTMLElement>;

export const Footer: FC<Props> = ({ className, ...props }) => {
  return (
    <footer
      {...props}
      className={clsx(
        'flex items-end md:absolute md:right-5 md:bottom-5',
        className
      )}
    >
      <Button kind="link" href="/rules">
        Rules
      </Button>
    </footer>
  );
};
