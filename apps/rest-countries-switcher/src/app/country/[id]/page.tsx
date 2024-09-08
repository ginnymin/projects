import { fetcher } from '@api/fetcher';
import { CountryDetail } from '@components/CountryDetail';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const country = await fetcher(['/alpha', id]);

  return <CountryDetail {...country} />;
};

export default Page;
