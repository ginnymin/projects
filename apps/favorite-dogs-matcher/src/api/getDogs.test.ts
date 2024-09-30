import { getDogs } from './getDogs';

jest.mock('next/headers', () => ({ cookies: jest.fn().mockReturnValue('') }));

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe('api: fetcher', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            prev: undefined,
            next: 'pagination',
            total: 100,
            resultIds: ['1', '2', '3'],
          }),
      })
    );
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: '1', zip_code: '12345' },
            { id: '2', zip_code: '67890' },
            { id: '3', zip_code: '12345' },
          ]),
      })
    );
  });

  it('calls fetch with expected options', async () => {
    await getDogs(['/dogs/search', undefined]);

    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://frontend-take-home-service.fetch.com/dogs/search',
      expect.anything()
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://frontend-take-home-service.fetch.com/dogs',
      expect.objectContaining({
        body: JSON.stringify(['1', '2', '3']),
      })
    );
  });

  it('returns expected data', async () => {
    const result = await getDogs(['/dogs/search', undefined]);

    expect(result).toStrictEqual({
      prev: undefined,
      next: 'pagination',
      total: 100,
      dogs: [
        { id: '1', zipCode: '12345' },
        { id: '2', zipCode: '67890' },
        { id: '3', zipCode: '12345' },
      ],
    });
  });
});
