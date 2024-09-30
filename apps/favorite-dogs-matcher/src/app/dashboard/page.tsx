import { unstable_serialize } from 'swr';

import { getBreeds } from '@api/getBreeds';
import { getDogs } from '@api/getDogs';
import { DogsGrid } from '@components/DogsGrid';
import { Header } from '@components/Header';
import { SWRProvider } from '@components/SWRProvider';

export const metadata = {
  title: 'dashboard',
  description: 'dogs',
};

const queryParams = new URLSearchParams();
queryParams.set('size', '25');
queryParams.set('from', '0');
queryParams.set('sort', 'breed:asc');

const Page = async () => {
  const [dogs, breeds] = await Promise.all([
    getDogs(['/dogs/search', queryParams.toString()]),
    getBreeds(),
  ]);

  return (
    <>
      <Header />
      <div className="p-main flex-1">
        <SWRProvider
          value={{
            fallback: {
              [unstable_serialize(['/dogs/search', queryParams.toString()])]:
                dogs,
              [unstable_serialize(['/dogs/breeds', undefined])]: breeds,
            },
          }}
        >
          <DogsGrid />
        </SWRProvider>
      </div>
    </>
  );
};

export default Page;
