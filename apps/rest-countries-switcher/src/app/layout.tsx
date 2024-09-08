import clsx from 'clsx';
import { Nunito_Sans } from 'next/font/google';

import { Header } from '@components/Header';

import './globals.scss';

const font = Nunito_Sans({ subsets: ['latin'], weight: ['300', '600', '800'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/**
         * system dark mode detection
         */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: process.env.MODE_DETECT }}
        />
      </head>
      <body
        className={clsx(
          'min-h-screen flex flex-col',
          'text-blue-dark-text bg-gray-light',
          'dark:text-white dark:bg-blue-dark-background',
          font.className
        )}
      >
        <Header />
        <main className="flex flex-col flex-1 mx-10 my-8 md:mx-16 md:my-10">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
