import { unstable_serialize } from 'swr';

import { fetcher } from '@api/fetcher';
import { Countries } from '@components/Countries';
import { CountryProvider } from '@components/CountryProvider';
import { RegionSelector } from '@components/RegionSelector';
import { Search } from '@components/Search';
import { SWRProvider } from '@components/SWRProvider';

export const metadata = {
  title: 'ginnymin',
  description: 'A fun little project from ginnymin.com',
};

const Page = async () => {
  const countries = await fetcher(['/all']);

  return (
    <SWRProvider
      value={{
        fallback: { [unstable_serialize(['/all', undefined])]: countries },
      }}
    >
      <CountryProvider>
        <div className="text-sm">
          <div className="md:flex md:justify-between mb-8">
            <Search />
            <RegionSelector className="mt-6 md:mt-0" />
          </div>
          <Countries />
        </div>
      </CountryProvider>
    </SWRProvider>
  );
};

export default Page;
