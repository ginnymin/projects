import clsx from 'clsx';
import Image from 'next/image';
import type { FC, HTMLAttributes } from 'react';
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi';

import { type Dog } from '@api/getDogs';
import { Button } from '@components/Button';

type Props = HTMLAttributes<HTMLDivElement> & Dog;

export const DogDetail: FC<Props> = ({
  age,
  breed,
  className,
  img,
  name,
  zipCode,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row md:items-center gap-6 md:gap-10 lg:gap-20 mx-auto max-w-5xl',
        className
      )}
    >
      <div className="relative md:flex-1 min-w-72 md:min-w-96 h-96">
        <Image src={img} fill alt="" className="rounded-md object-cover" />
      </div>
      <div className="flex flex-col md:flex-1 md:max-w-lg">
        <BiSolidQuoteAltLeft className="size-6" />
        <p className="mx-6 text-lg italic">
          Hi, my name is <strong>{name}</strong>! I&apos;m a loving {breed} and
          am {age} year(s) old. The zip code I live in is {zipCode}. I
          can&apos;t wait to meet you!
        </p>
        <BiSolidQuoteAltRight className="size-6 self-end relative -top-4" />
        <Button
          className="mt-10"
          kind="link"
          size="large"
          href="/dashboard"
          replace
        >
          Find another match
        </Button>
      </div>
    </div>
  );
};
