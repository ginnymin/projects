'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import SetCookieParser from 'set-cookie-parser';

import { fetcher } from './fetcher';

type Result = {
  error?: boolean;
};

type CookieOptions = NonNullable<
  Parameters<Awaited<ReturnType<typeof cookies>>['set']>[2]
>;

/**
 *
 * Form action passed to LoginForm.
 * Calls /auth/login, sets auth cookie, then redirects user to /dashboard
 *
 */
export const login = async (
  _prevState: Result,
  formData: FormData
): Promise<Result> => {
  try {
    let name = formData.get('name');
    let email = formData.get('email');

    name = typeof name === 'string' ? name : '';
    email = typeof email === 'string' ? email : '';

    const response = await fetcher([
      '/auth/login',
      undefined,
      JSON.stringify({
        name,
        email,
      }),
    ]);

    const parsedCookies = SetCookieParser.parse(
      response.headers.getSetCookie()
    );

    const cookiesResult = await cookies();

    parsedCookies.forEach((c) => {
      const { name, value, ...opts } = c;

      cookiesResult.set(name, value, {
        ...opts,
        sameSite: (opts.sameSite as CookieOptions['sameSite']) ?? undefined,
      });
    });
  } catch (e) {
    console.log('login failed', e);
    return { error: true };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard', RedirectType.replace);
};
