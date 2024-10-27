'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type HTMLAttributes,
} from 'react';
import { CgSpinner } from 'react-icons/cg';

import { Input } from '@components/Input';
import { Recipe } from '@store/types';
import { useStore } from '@store/useStore';

type Props = HTMLAttributes<HTMLElement> & {};

export const RecipeList: FC<Props> = () => {
  const pathname = usePathname();
  const { getAll } = useStore();
  const [data, setData] = useState<Recipe[] | undefined>();
  const [filter, setFilter] = useState('');

  const filteredData = useMemo(
    () =>
      filter.trim() !== ''
        ? data?.filter(
            (recipe) =>
              recipe.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
          )
        : data,
    [data, filter]
  );

  const handleFilter: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    []
  );

  useEffect(() => {
    const run = async () => {
      const result = await getAll();
      setData(result);
    };

    if (pathname === '/') {
      void run();
    }
  }, [getAll, pathname]);

  const containerClass = 'bg-slate-100 rounded-lg p-4 min-h-48';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2">
        <h2 className="px-4 font-semibold text-xl mb-2 sm:mb-0">
          My smoothies
        </h2>
        <Input
          placeholder="Search..."
          label="Filter smoothies by name"
          hideLabel
          id="smoothie-filter"
          onChange={handleFilter}
          debounceDelay={300}
          disabled={data === undefined || data.length === 0}
          leading
          className={clsx({
            invisible: data === undefined || data.length === 0,
          })}
        />
      </div>
      {data === undefined ? (
        <div
          className={clsx(containerClass, 'flex justify-center items-center')}
        >
          <CgSpinner className="size-12 animate-spin" />
          <p className="sr-only">Loading...</p>
        </div>
      ) : data.length === 0 ? (
        <div className={containerClass}>No recipes yet!</div>
      ) : filteredData !== undefined && filteredData.length === 0 ? (
        <div className={containerClass}>No recipes found!</div>
      ) : (
        <ul className={containerClass}>
          {filteredData?.map((recipe) => (
            <li key={recipe.id}>
              <Link
                href={`/recipe/${recipe.id}`}
                className="hover:text-teal-600"
              >
                {recipe.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
