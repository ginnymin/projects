'use client';

import { type FC, type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement>;

export const Header: FC<Props> = () => {
  return (
    <h1 className="px-10 md:px-16 py-7 font-bold text-2xl shadow-md shadow-black/5 bg-white dark:bg-blue-dark">
      Where in the world?
    </h1>
  );
};
