'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, type FC, type HTMLAttributes } from 'react';

import { logout } from '@api/logout';
import { Button } from '@components/Button';

type Props = HTMLAttributes<HTMLDivElement>;

export const Header: FC<Props> = ({ className }) => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    const run = async () => {
      try {
        await logout();
        router.replace('/');
      } catch (e: unknown) {
        console.log('Header handleLogout error', e);
      }
    };
    void run();
  }, [router]);

  return (
    <div
      className={clsx(
        'flex justify-between items-center px-main py-2.5 bg-white',
        className
      )}
    >
      <h1 className="font-semibold text-xl">Fetch Rescue</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
