import clsx from 'clsx';
import Image from 'next/image';
import {
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  type FC,
  type HTMLAttributes,
} from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

import { type Dog as DogType } from '@api/getDogs';

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'onSelect'>,
    DogType {
  onSelect?: (dog: DogType) => void;
  selected?: boolean;
}

const DogComponent: FC<Props> = ({
  age,
  breed,
  className,
  id,
  img,
  name,
  zipCode,
  onSelect,
  selected,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelect: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (onSelect !== undefined) {
        // button already handles this, we don't need to duplicate the event
        if (event.target === buttonRef.current) {
          return;
        }

        onSelect({ age, breed, id, img, name, zipCode });
      }
    },
    [age, breed, id, img, name, zipCode, onSelect]
  );

  return (
    <div
      className={clsx(
        'relative rounded-md shadow-md shadow-black/5 bg-white overflow-hidden cursor-pointer hover:scale-[1.02] focus-within:scale-[1.02] focus-within:outline focus-within:outline-2 focus-within:outline-purple-700',
        className
      )}
      onClick={handleSelect}
    >
      <div className="relative h-[200px]">
        <Image src={img} alt="" fill className="object-cover" />
      </div>
      <div className="p-2.5">
        <div className="flex justify-between items-center">
          <h3 className="inline-block text-base font-bold">{name}</h3>
          <button className="focus:outline-none">
            {selected ? (
              <HiHeart className="size-5 fill-purple-600" />
            ) : (
              <HiOutlineHeart className="size-5" />
            )}
            <span className="sr-only">
              {selected ? 'De-select' : 'Select'} as a favorite
            </span>
          </button>
        </div>
        <ul>
          <li className="text-sm">
            <strong className="font-semibold">Breed</strong>: {breed}
          </li>
          <li className="text-sm">
            <strong className="font-semibold">Age</strong>: {age}
          </li>
          <li className="text-sm">
            <strong className="font-semibold">Zip code</strong>: {zipCode}
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Dog = memo(DogComponent);
