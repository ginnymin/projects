'use server';

import { cookies } from 'next/headers';

import { fetcher } from './fetcher';

/**
 *
 * Logout by deauthorizing token and removing the fetch-access-token cookie
 */
export const logout = async () => {
  await fetcher(['/auth/logout', undefined, '']);

  const cookiesResult = await cookies();

  cookiesResult.delete('fetch-access-token');
};
