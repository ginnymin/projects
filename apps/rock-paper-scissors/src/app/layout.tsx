import clsx from 'clsx';
import { Barlow_Semi_Condensed } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.scss';

const font = Barlow_Semi_Condensed({
  weight: ['600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'rock-paper-scissors',
  description: 'Project application.',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={clsx(font.className)}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
