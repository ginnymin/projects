import clsx from 'clsx';
import Image from 'next/image';
import type { FC, HTMLAttributes } from 'react';

import { Country } from '@api/types';

type Props = HTMLAttributes<HTMLImageElement> & Country['flag'] & {};

export const Flag: FC<Props> = ({ alt, src, className, ...props }) => {
  return (
    <Image
      {...props}
      className={clsx('aspect-[1.65] object-cover', className)}
      alt={alt}
      src={src}
      width={1235}
      height={650}
    />
  );
};
