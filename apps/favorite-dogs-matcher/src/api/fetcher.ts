import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export type FetcherPaths =
  | '/auth/login'
  | '/auth/logout'
  | '/dogs/breeds'
  | '/dogs/search'
  | '/dogs/match'
  | '/dogs';

export async function fetcher([path, queryParams, bodyParams]: [
  FetcherPaths,
  string | undefined,
  string | undefined
]) {
  const url = `${BASE_URL}${path}${
    queryParams !== undefined ? `?${queryParams}` : ''
  }`;

  const cookiesResult = await cookies();

  const response = await fetch(url, {
    credentials: 'include',
    method: bodyParams !== undefined ? 'POST' : 'GET',
    headers: {
      Cookie: cookiesResult.toString(),
      'Content-Type': 'application/json',
    },
    body: bodyParams,
  });

  // Handle errors
  if (!response.ok) {
    console.log('fetcher error', url, response);

    if (response.status === 401) {
      revalidatePath('/');
      redirect('/', RedirectType.replace);
    }

    throw new Error(`Failed to fetch ${url}`);
  }

  return response;
}
