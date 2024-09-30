'use server';

import { fetcher } from './fetcher';

/**
 *
 * @param ids array of dog IDs to match
 */
export const getMatch = async (ids: string[]) => {
  try {
    const response = await fetcher([
      '/dogs/match',
      undefined,
      JSON.stringify(ids),
    ]);

    const data = (await response.json()) as { match: string };
    const id = data.match;

    return id;
  } catch (e) {
    console.log('getMatch error', e);
  }
};
