import clsx from 'clsx';
import { Barlow_Semi_Condensed } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

import './globals.scss';

const font = Barlow_Semi_Condensed({
  weight: ['600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'rock-paper-scissors',
  description: 'Project application.',
};

const RootLayout = ({
  children,
  modal,
}: PropsWithChildren & { modal: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          'relative flex justify-center min-h-screen text-white tracking-widest',
          font.className
        )}
      >
        <div
          className={clsx(
            'mx-4 my-4 xs:mx-8 xs:my-10 flex flex-col items-center justify-stretch gap-10 w-full'
          )}
        >
          <Header className="w-full md:w-[700px] min-w-72" />
          <main className="min-w-72">{children}</main>
          <Footer className="h-full" />
        </div>
        {modal}
      </body>
    </html>
  );
};

export default RootLayout;
