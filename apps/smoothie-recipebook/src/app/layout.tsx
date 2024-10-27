import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.scss';

const font = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          'min-h-screen flex flex-col',
          'text-gray-700 bg-white',
          font.className
        )}
      >
        <main className="flex-1 flex flex-col justify-center items-center">
          {children}
        </main>

        {modal}
      </body>
    </html>
  );
};

export default RootLayout;
