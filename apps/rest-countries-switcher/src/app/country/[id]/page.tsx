import { fetcher } from "@api/fetcher";
import { CountryDetail } from "@components/CountryDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const id = p.id;

  const data = await fetcher(["/codes.alpha_3", id]);
  const country = data[0];

  return <CountryDetail {...country} />;
};

export default Page;
