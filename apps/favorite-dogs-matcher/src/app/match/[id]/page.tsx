import { unstable_serialize } from 'swr';

import { getDogsByIds } from '@api/getDogs';
import { DogDetail } from '@components/DogDetail';
import { Header } from '@components/Header';
import { SWRProvider } from '@components/SWRProvider';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const dogs = await getDogsByIds(['/dogs', [id]]);
  const dog = dogs[0];

  return (
    <>
      <Header />
      <div className="p-main">
        <SWRProvider
          value={{
            fallback: {
              [unstable_serialize(['/dogs', [id]])]: dogs,
            },
          }}
        >
          <h2 className="text-2xl font-semibold">
            Congratulations! You have a match!
          </h2>
          <DogDetail {...dog} className="mt-6 md:mt-10" />
        </SWRProvider>
      </div>
    </>
  );
};

export default Page;
