import clsx from 'clsx';
import { type ComponentProps, type FC } from 'react';

import { Hand } from './Hand';

type Props = ComponentProps<typeof Hand> & {
  winner?: boolean;
};

/**
 * Container for Hand component that's used in Result.
 * Wraps with WinningHand to apply winning styles.
 */
export const ResultHand: FC<Props> = ({
  winner = false,
  className,
  ...props
}) => {
  if (winner) {
    return (
      <WinningHand className={className}>
        <Hand {...props} size="large" />
      </WinningHand>
    );
  }
  return <Hand {...props} className={clsx(className)} size="large" />;
};

const WinningHand: FC<Pick<Props, 'children' | 'className'>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'relative w-fit rounded-full outline outline-[25px] outline-white/[.08]',
        'before:content-[""] before:absolute before:inset-0 before:rounded-full before:outline before:outline-[25px] before:outline-offset-[25px] before:outline-white/5',
        'after:content-[""] after:absolute after:inset-0 after:rounded-full after:outline after:outline-[25px] after:outline-offset-[50px] after:outline-white/[.02]',
        'md:outline-[60px] md:before:outline-[60px] md:before:outline-offset-[60px] md:after:outline-[60px] md:after:outline-offset-[120px]',
        className
      )}
    >
      {children}
    </div>
  );
};
