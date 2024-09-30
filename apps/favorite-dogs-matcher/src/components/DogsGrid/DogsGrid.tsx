'use client';

import {
  MouseEventHandler,
  useCallback,
  useState,
  type FC,
  type HTMLAttributes,
} from 'react';
import { FaSortAmountUpAlt, FaSortAmountDown } from 'react-icons/fa';
import { HiOutlineX } from 'react-icons/hi';

import { Dog as DogType } from '@api/getDogs';
import { BreedSelector } from '@components/BreedSelector';
import { Button } from '@components/Button';
import { Dog } from '@components/Dog';
import { FavoriteDogs } from '@components/FavoriteDogs';
import { Grid } from '@components/Grid';
import { Skeleton } from '@components/Skeleton';
import { useFetchDogs } from '@hooks/useFetchDogs';

type Props = HTMLAttributes<HTMLDivElement>;

const SIZE = 25;
const defaultParams = new URLSearchParams();
defaultParams.set('size', SIZE.toString());
defaultParams.set('from', '0');

export const DogsGrid: FC<Props> = () => {
  const [selectedDogs, setSelectedDogs] = useState<DogType[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [paginationParams, setPaginationParams] = useState<string>(
    defaultParams.toString()
  );
  const [page, setPage] = useState<number>(1);

  const { data } = useFetchDogs(
    { breeds: selectedBreeds, sort: 'breed:' + sort },
    paginationParams
  );

  const isLoading = data === undefined;

  const totalPages =
    typeof data?.total === 'number' ? Math.ceil(data.total / SIZE) : undefined;

  const toggleSort = useCallback(() => {
    setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleRemoveBreed: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const id = event.target.dataset.breed;
        setSelectedBreeds((prev) => prev.filter((i) => i !== id));
        setPaginationParams(defaultParams.toString());
        setPage(1);
      }
    },
    []
  );

  const handleSelectBreed = useCallback((breeds: string[]) => {
    setSelectedBreeds(breeds);
    setPaginationParams(defaultParams.toString());
    setPage(1);
  }, []);

  const handleSelect = useCallback((dog: DogType) => {
    setSelectedDogs((prev) =>
      prev.some((d) => d.id === dog.id)
        ? prev.filter((d) => d.id !== dog.id)
        : [...prev, dog]
    );
  }, []);

  const handlePrevious = useCallback(() => {
    if (data?.prev !== undefined) {
      setPaginationParams(data.prev);
      setPage((prev) => prev - 1);
    }
  }, [data]);

  const handleNext = useCallback(() => {
    if (data?.next !== undefined) {
      setPaginationParams(data.next);
      setPage((prev) => prev + 1);
    }
  }, [data]);

  return (
    <>
      <div className="flex md:items-start gap-4 -mx-2 px-2 -mt-4 py-4 mb-1.5 sticky top-0 bg-stone-200 z-[1]">
        <Button
          className="flex gap-2 items-center flex-nowrap text-nowrap"
          variant="outline"
          onClick={toggleSort}
          disabled={isLoading}
        >
          {sort === 'asc' ? <FaSortAmountUpAlt /> : <FaSortAmountDown />}
          <span className="sr-only">
            Sort {sort === 'asc' ? 'ascending' : 'descending'}
          </span>
          <span className="max-md:sr-only">by breed</span>
        </Button>
        <div className="flex items-end flex-wrap gap-x-2 gap-y-1">
          <BreedSelector
            selectedBreeds={selectedBreeds}
            onChange={handleSelectBreed}
            disabled={isLoading}
          />
          {selectedBreeds.length > 0 &&
            selectedBreeds.map((breed) => (
              <button
                key={breed}
                data-breed={breed}
                className="hidden md:flex gap-1.5 items-center bg-white text-xs px-2 py-1 rounded-md"
                onClick={handleRemoveBreed}
              >
                {breed} <HiOutlineX className="pointer-events-none" />
              </button>
            ))}
        </div>
        {selectedDogs.length > 0 && (
          <FavoriteDogs
            className="ml-auto"
            selectedDogs={selectedDogs}
            onRemove={handleSelect}
          />
        )}
      </div>
      {isLoading ? (
        <Grid as="div">
          <h2 className="sr-only">Loading...</h2>
          {Array(10)
            .fill(1)
            .map((_i, index) => (
              <Skeleton key={index} className="h-60" />
            ))}
        </Grid>
      ) : data.dogs.length === 0 ? (
        <div className="flex-1">
          Looks like there aren&apos;t any matches for your search. Try changing
          or removing some filters to get more matches!
        </div>
      ) : (
        <Grid>
          {data.dogs.map((dog) => (
            <li key={dog.id} role="gridcell">
              <Dog
                {...dog}
                onSelect={handleSelect}
                selected={selectedDogs.some((d) => d.id === dog.id)}
              />
            </li>
          ))}
        </Grid>
      )}
      {Array.isArray(data?.dogs) && data.dogs.length > 0 && (
        <div className="flex justify-between -mx-2 px-2 py-4 sticky bottom-0 bg-stone-200">
          <Button
            disabled={data?.prev === undefined || page === 1}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          {totalPages !== undefined && (
            <span>
              {page} / {totalPages}
            </span>
          )}
          <Button
            className="justify-self-end"
            disabled={data?.next === undefined || page === totalPages}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};
