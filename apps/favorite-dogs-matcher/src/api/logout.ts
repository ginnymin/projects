'use server';

import { cookies } from 'next/headers';

import { fetcher } from './fetcher';

/**
 *
 * Logout by deauthorizing token and removing the fetch-access-token cookie
 */
export const logout = async () => {
  await fetcher(['/auth/logout', undefined, '']);

  cookies().delete('fetch-access-token');
};
