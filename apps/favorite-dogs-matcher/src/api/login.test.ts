import { login } from './login';

const mockRevalidatePath = vi.fn();
const mockRedirect = vi.fn();
const mockCookiesSet = vi.fn();

vi.mock('next/cache', () => ({
  revalidatePath: () => mockRevalidatePath() as void,
}));

vi.mock('next/navigation', () => ({
  RedirectType: { replace: 'replace' },
  redirect: (...args: string[]) => mockRedirect(...args) as void,
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    set: (...args: string[]) => mockCookiesSet(...args) as void,
  }),
}));

const mockFetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    headers: { getSetCookie: () => ['key=value'] },
  })
);

global.fetch = mockFetch;

const data = new FormData();
data.append('name', 'My Name');
data.append('email', 'email@email.com');

describe('api: fetcher', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockCookiesSet.mockClear();
    mockRevalidatePath.mockClear();
    mockRedirect.mockClear();
  });

  it('calls login with expected options', async () => {
    await login({}, data);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://frontend-take-home-service.fetch.com/auth/login',
      expect.objectContaining({
        body: JSON.stringify({ name: 'My Name', email: 'email@email.com' }),
      })
    );
  });

  it('sets cookies', async () => {
    await login({}, data);

    expect(mockCookiesSet).toHaveBeenCalledWith('key', 'value', {
      sameSite: undefined,
    });
  });

  it('redirects', async () => {
    await login({}, data);

    expect(mockRevalidatePath).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith('/dashboard', 'replace');
  });

  it('return error', async () => {
    mockFetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const result = await login({}, data);

    expect(result).toStrictEqual({ error: true });

    expect(mockRevalidatePath).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
