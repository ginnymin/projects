import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import type { FC } from 'react';

import { HandType } from '@components/constants';

import Lizard from './assets/icon-lizard.svg';
import Paper from './assets/icon-paper.svg';
import Rock from './assets/icon-rock.svg';
import Scissors from './assets/icon-scissors.svg';
import Spock from './assets/icon-spock.svg';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  type: HandType;
};

const IconMap: { [key in HandType]: string } = {
  [HandType.LIZARD]: Lizard,
  [HandType.PAPER]: Paper,
  [HandType.ROCK]: Rock,
  [HandType.SCISSORS]: Scissors,
  [HandType.SPOCK]: Spock,
};

export const Icon: FC<Props> = ({ className, type, ...props }) => {
  return (
    <Image
      {...props}
      className={clsx('scale-[1.75]', className)}
      src={IconMap[type]}
      alt={type}
    />
  );
};
