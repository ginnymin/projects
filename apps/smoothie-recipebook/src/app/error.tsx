'use client'; // Error boundaries must be Client Components

import { HiExclamation } from 'react-icons/hi';

const Page = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <HiExclamation className="size-24" />
      <p>Oops, there was an error!</p>
      <p>Please try again.</p>
    </div>
  );
};

export default Page;
