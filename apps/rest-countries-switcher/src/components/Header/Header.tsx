'use client';

import { useCallback, type FC, type HTMLAttributes } from 'react';
import { HiMoon } from 'react-icons/hi2';

type Props = HTMLAttributes<HTMLElement>;

export const Header: FC<Props> = () => {
  const toggleMode = useCallback(() => {
    const documentMode = document.documentElement.getAttribute('data-mode');
    document.documentElement.setAttribute(
      'data-mode',
      documentMode === 'dark' ? 'light' : 'dark'
    );
  }, []);

  return (
    <div className="flex justify-between px-10 md:px-16 py-7 shadow-md shadow-black/5 bg-white dark:bg-blue-dark">
      <h1 className="font-bold text-2xl ">Where in the world?</h1>
      <button
        onClick={toggleMode}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/5 dark:active:bg-white/10"
      >
        <HiMoon className="size-5 fill-blue-dark dark:fill-white" />
        <span className="font-semibold">Toggle mode</span>
      </button>
    </div>
  );
};
