import clsx from 'clsx';
import Image from 'next/image';
import type { FC, HTMLAttributes } from 'react';

import { Country } from '@api/types';

type Props = HTMLAttributes<HTMLImageElement> & Country['flag'] & {};

export const Flag: FC<Props> = ({ alt, src, className, ...props }) => {
  if (!src || src.trim() === '') {
    return <span className={clsx('block aspect-[1.65] object-cover w-full', className)} />;
  }
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
