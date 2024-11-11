import { fetcher } from './fetcher';

const mockDataBase = {
  capital: ['Washington, D.C.'],
  cca3: 'usa',
  flags: {
    png: 'https://site.com/image.png',
    svg: 'https://site.com/image.svg',
    alt: 'This is a flag.',
  },
  name: {
    common: 'United States',
    official: 'United States of America',
    nativeName: { eng: { official: 'United States', common: 'US' } },
  },
  population: 100,
  region: 'Americas',
};

const mockDataDetails = {
  borders: ['CAN', 'MEX'],
  currencies: { USD: { name: 'US Dollar', symbol: '$' } },
  languages: { eng: 'English' },
  subregion: 'North America',
  tld: ['.us'],
};

const mockFetch = vi.fn().mockImplementation((url?: string) =>
  url?.includes('/name')
    ? Promise.resolve({
        ok: false,
        json: () => Promise.resolve([{ error: true }]),
      })
    : Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ ...mockDataBase, ...mockDataDetails }]),
      })
);

global.fetch = mockFetch;

describe('api: fetcher', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('calls fetch with expected url', async () => {
    await fetcher(['/all']);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,population,region'
    );
  });

  it('calls fetch with detail url', async () => {
    await fetcher(['/alpha', 'usa']);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/usa?fields=cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders'
    );
  });

  it('returns expected data', async () => {
    const data = await fetcher(['/all']);
    expect(data).toStrictEqual([
      {
        borders: ['CAN', 'MEX'],
        capital: 'Washington, D.C.',
        currencies: ['US Dollar'],
        flag: { alt: 'This is a flag.', src: 'https://site.com/image.svg' },
        id: 'usa',
        languages: ['English'],
        name: 'United States',
        nativeName: 'US',
        population: 100,
        region: 'Americas',
        subregion: 'North America',
        topLevelDomain: '.us',
      },
    ]);
  });

  it('throws an error', async () => {
    await expect(fetcher(['/name', 'param'])).rejects.toThrow(
      'Failed to fetch https://restcountries.com/v3.1/name/param?fields=cca3,name,flags,capital,population,region'
    );
  });
});
