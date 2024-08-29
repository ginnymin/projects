import clsx from 'clsx';
import type { FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  player?: 'player' | 'house';
};

export const Choice: FC<Props> = ({
  player = 'player',
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-2 xs:gap-4 md:gap-8 lg:gap-14',
        className
      )}
    >
      <h2 className="uppercase text-xs xs:text-base md:text-2xl order-2 md:order-1">
        {player === 'house' ? 'The House picked' : 'You picked'}
      </h2>
      {children}
    </div>
  );
};
