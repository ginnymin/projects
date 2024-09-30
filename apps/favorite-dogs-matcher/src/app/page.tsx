import clsx from 'clsx';

import { LoginForm } from '@components/LoginForm';

import styles from './page.module.scss';

export const metadata = {
  title: 'Login',
  description: 'Login to Dogs',
};

const Page = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-8 justify-center p-main">
      <h1 className="md:flex-1 text-4xl mb-8 lg:p-10">
        Welcome to <strong className="font-semibold">Fetch Rescue</strong>! Sign
        in to get started.
      </h1>

      <LoginForm className={clsx(styles['fade-in'], 'md:flex-1 lg:p-12')} />
    </div>
  );
};

export default Page;
