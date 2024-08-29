import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLSpanElement>;

export const EmptyHand: FC<Props> = () => {
  return (
    <div
      className={clsx(
        'relative w-56 h-56 bg-black/20 rounded-full overflow-hidden flex justify-center items-center animate-pulse'
      )}
    >
      <span className="sr-only">Pending...</span>
    </div>
  );
};
