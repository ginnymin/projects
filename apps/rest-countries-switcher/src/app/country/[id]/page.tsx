import { fetcher } from '@api/fetcher';
import { CountryDetail } from '@components/CountryDetail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  const country = await fetcher(['/alpha', id]);

  return <CountryDetail {...country} />;
};

export default Page;
