import clsx from 'clsx';
import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const font = Lexend({ subsets: ['latin'], weight: ['300', '600', '800'] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={clsx('min-h-screen flex flex-col', 'text-gray-800 bg-stone-200', font.className)}
      >
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
