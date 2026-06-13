import { fetcher } from './fetcher';

const mockDataBase = {
  capitals: [{ name: 'Washington, D.C.' }],
  codes: { alpha_3: 'usa' },
  flag: {
    url_png: 'https://site.com/image.png',
    url_svg: 'https://site.com/image.svg',
    emoji: '🇺🇸',
  },
  names: {
    common: 'United States',
    official: 'United States of America',
    native: { eng: { official: 'United States', common: 'US' } },
  },
  population: 100,
  region: 'Americas',
};

const mockDataDetails = {
  borders: ['CAN', 'MEX'],
  currencies: { USD: { name: 'US Dollar', symbol: '$' } },
  languages: [{ name: 'English' }],
  subregion: 'North America',
  tlds: ['.us'],
};

const mockFetch = vi.fn().mockImplementation((url?: string) =>
  url?.includes('/name')
    ? Promise.resolve({
        ok: false,
        json: () => Promise.resolve([{ error: true }]),
      })
    : Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ data: { objects: [{ ...mockDataBase, ...mockDataDetails }] } }),
      })
);

global.fetch = mockFetch;

describe('api: fetcher', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('calls fetch with expected url', async () => {
    await fetcher(['']);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.restcountries.com/countries/v5?fields=cca3,name,flags,capital,population,region&limit=100',
      { headers: { Authorization: 'Bearer undefined' } }
    );
  });

  it('calls fetch with detail url', async () => {
    await fetcher(['/codes.alpha_3', 'usa']);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.restcountries.com/countries/v5/codes.alpha_3/usa?fields=cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders&limit=100',
      { headers: { Authorization: 'Bearer undefined' } }
    );
  });

  it('returns expected data', async () => {
    const data = await fetcher(['']);
    expect(data).toStrictEqual([
      {
        borders: ['CAN', 'MEX'],
        capital: 'Washington, D.C.',
        currencies: ['US Dollar'],
        flag: { alt: '🇺🇸', src: 'https://site.com/image.svg' },
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
    await expect(fetcher(['/names.common', 'param'])).rejects.toThrow(
      'Failed to fetch https://api.restcountries.com/countries/v5/names.common?fields=cca3,name,flags,capital,population,region&limit=100&q=param'
    );
  });
});
