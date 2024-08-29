import clsx from 'clsx';
import { useMemo, type ComponentProps, type FC } from 'react';

import { NUMBER_OF_TYPES } from '@components/constants';

import { getPositions } from './getPositions';
import { Hand } from './Hand';

const RADIUS = 160; // Based on full size of background pentagon svg

type Props = ComponentProps<typeof Hand> & {
  index: number;
};

/**
 * Container for Hand component that's used in Board.
 * Applies positioning logic for pentagon layout.
 */
export const BoardHand: FC<Props> = ({
  className,
  index,
  style: styleProp,
  ...props
}) => {
  const style = useMemo(() => {
    const { x, y } = getPositions({
      sides: NUMBER_OF_TYPES,
      radius: RADIUS,
      index: index,
      offset: { x: -78, y: -64 },
      offsetAngle: -90, // we want to start at 12 o'clock, not at 3 o'clock
    });

    return { ...(styleProp ?? {}), left: x, top: y };
  }, [index, styleProp]);

  return (
    <Hand
      {...props}
      className={clsx('!absolute', className)}
      size="default"
      style={style}
    />
  );
};
