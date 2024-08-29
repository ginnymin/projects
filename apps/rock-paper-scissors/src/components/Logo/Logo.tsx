import Image from 'next/image';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import LogoSVG from './logo.svg';

type Props = HTMLAttributes<HTMLImageElement>;

export const Logo: FC<PropsWithChildren<Props>> = ({ ...props }) => {
  return (
    <Image
      {...props}
      src={LogoSVG}
      alt="ROCK PAPER SCISSORS LIZARD SPOCK"
      priority
    />
  );
};
