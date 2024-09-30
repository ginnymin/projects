import { renderHook } from '@testing-library/react';

import { getDogs } from '@api/getDogs';

import { useFetchDogs } from './useFetchDogs';

const mockSwr = jest.fn().mockReturnValue({ data: {} });

/* eslint-disable */
jest.mock('swr', () => ({
  __esModule: true,
  default: (...args: any) => mockSwr(...args),
}));
/* eslint-enable */

describe('hooks: useFetchDogs', () => {
  beforeEach(() => {
    mockSwr.mockClear();
  });

  it('returns data and calls SWR', () => {
    const { result } = renderHook(() => useFetchDogs({}, 'next=25'));

    expect(result.current.data).toStrictEqual({});

    expect(mockSwr).toHaveBeenCalledWith(
      ['/dogs/search', 'next=25'],
      getDogs,
      {}
    );
  });

  it('parses params', () => {
    renderHook(() =>
      useFetchDogs({ breeds: ['Aussie', 'Collie'], sort: 'desc' }, 'next=25')
    );

    expect(mockSwr).toHaveBeenCalledWith(
      ['/dogs/search', 'next=25&breeds=Aussie&breeds=Collie&sort=desc'],
      getDogs,
      {}
    );
  });
});
