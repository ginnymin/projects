import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import {
  type ButtonHTMLAttributes,
  useCallback,
  useState,
  type FC,
} from 'react';
import { HiHeart, HiOutlineX } from 'react-icons/hi';

import { Dog as DogType } from '@api/getDogs';
import { getMatch } from '@api/getMatch';
import { Button } from '@components/Button';
import { Dog } from '@components/Dog';
import { Grid } from '@components/Grid';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selectedDogs: DogType[];
  onRemove?: (dog: DogType) => void;
};

export const FavoriteDogs: FC<Props> = ({
  className,
  onRemove,
  selectedDogs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMatch = useCallback(() => {
    setLoading(true);

    const match = async () => {
      const id = await getMatch(selectedDogs.map((d) => d.id));

      if (typeof id === 'string') {
        router.push('/match/' + id);
      } else {
        setLoading(false);
      }
    };

    void match();
  }, [router, selectedDogs]);

  return (
    <>
      <button
        className={clsx('relative hover:scale-[1.1]', className)}
        onClick={toggleDialog}
      >
        <HiHeart className="size-10 fill-purple-600 drop-shadow-md" />
        <span className="absolute bg-stone-700 text-white rounded-lg px-1.5 text-xs font-semibold left-[65%] -top-0">
          <span className="sr-only">
            View your favorites. Number of favorites:
          </span>{' '}
          {selectedDogs.length}
        </span>
      </button>
      <Dialog open={isOpen} onClose={toggleDialog} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 flex w-screen md:items-center justify-center md:p-4">
          <DialogPanel className="relative bg-stone-200 w-full md:max-w-5xl max-h-screen overflow-auto border p-10 md:pt-8">
            <CloseButton className="absolute right-5 top-5">
              <HiOutlineX className="size-7" />
              <span className="sr-only">Close dialog</span>
            </CloseButton>
            <DialogTitle className="font-semibold text-xl">
              Your favorites
            </DialogTitle>
            <p>
              You&apos;ve selected {selectedDogs.length} dogs so far. Click on a
              dog below to de-select it. Ready to get matched? Click the{' '}
              <em>Find my match</em> button below!
            </p>
            <Button
              size="large"
              className="block my-6 w-full max-w-96 mx-auto"
              disabled={isLoading}
              onClick={handleMatch}
            >
              {isLoading ? 'Matching...' : 'Find my match!'}
            </Button>
            <Grid>
              {selectedDogs.map((dog) => (
                <li key={dog.id}>
                  <Dog {...dog} selected={true} onSelect={onRemove} />
                </li>
              ))}
            </Grid>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
