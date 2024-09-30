import { fetcher } from './fetcher';

const mockRevalidatePath = jest.fn();
const mockRedirect = jest.fn();

jest.mock('next/cache', () => ({
  revalidatePath: () => mockRevalidatePath() as void,
}));

jest.mock('next/navigation', () => ({
  RedirectType: { replace: 'replace' },
  redirect: (...args: string[]) => mockRedirect(...args) as void,
}));

jest.mock('next/headers', () => ({ cookies: jest.fn().mockReturnValue('') }));

const mockFetch = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ ok: true }));

global.fetch = mockFetch;

describe('api: fetcher', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('calls fetch with expected options', async () => {
    await fetcher(['/dogs/breeds', undefined, undefined]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://frontend-take-home-service.fetch.com/dogs/breeds',
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          Cookie: '',
          'Content-Type': 'application/json',
        },
        body: undefined,
      }
    );
  });

  it('calls fetch with query parameters', async () => {
    await fetcher(['/dogs/search', 'key=value&this=that', undefined]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://frontend-take-home-service.fetch.com/dogs/search?key=value&this=that',
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          Cookie: '',
          'Content-Type': 'application/json',
        },
        body: undefined,
      }
    );
  });

  it('calls fetch with body parameters', async () => {
    await fetcher(['/auth/login', undefined, '{name:"name"}']);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://frontend-take-home-service.fetch.com/auth/login',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          Cookie: '',
          'Content-Type': 'application/json',
        },
        body: '{name:"name"}',
      }
    );
  });

  it('throws an error', async () => {
    mockFetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    await expect(
      fetcher(['/dogs/breeds', undefined, undefined])
    ).rejects.toThrow(
      'Failed to fetch https://frontend-take-home-service.fetch.com/dogs/breeds'
    );
  });

  it('redirects on 401', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 401 })
    );

    await expect(
      fetcher(['/dogs/breeds', undefined, undefined])
    ).rejects.toThrow();

    expect(mockRevalidatePath).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith('/', 'replace');
  });
});
