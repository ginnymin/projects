import { CgSpinner } from 'react-icons/cg';

const Page = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CgSpinner className="size-24 animate-spin" />
      <p className="mt-3">Loading...</p>
    </div>
  );
};

export default Page;
