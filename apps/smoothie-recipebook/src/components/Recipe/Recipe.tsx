'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { RecipeForm } from '@components/RecipeForm';
import { Recipe as RecipeType } from '@store/types';
import { useStore } from '@store/useStore';

type Props = {
  id: string | undefined;
};

export const Recipe = ({ id }: Props) => {
  const { getAllRecipes, get, add, update, remove } = useStore();
  const [data, setData] = useState<RecipeType | undefined>();
  const [nameError, setNameError] = useState(false);
  const router = useRouter();

  const handleSave = (data: Omit<RecipeType, 'id'>) => {
    setNameError(false);

    const sameNameRecipe = getAllRecipes()?.some(
      (r) => r.name === data.name && r.id !== Number(id)
    );

    if (sameNameRecipe) {
      setNameError(true);
      return;
    }

    if (id === undefined) {
      add(data)
        .then(() => {
          router.back();
        })
        .catch(() => {});
    } else {
      update(Number(id), { ...data, id: Number(id) })
        .then(() => {
          router.back();
        })
        .catch(() => {});
    }
  };

  const handleRmove = () => {
    remove(Number(id))
      .then(() => {
        router.back();
      })
      .catch(() => {});
  };

  useEffect(() => {
    const run = async () => {
      if (id === undefined) {
        return;
      }

      const result = await get(Number(id));
      setData(result);
    };

    void run();
  }, [get, id]);

  if (id === undefined) {
    return <RecipeForm onSave={handleSave} hasNameError={nameError} />;
  }

  if (data === undefined) {
    return (
      <div>
        <CgSpinner className="size-24 animate-spin" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  return (
    <RecipeForm
      name={data.name}
      ingredients={data.ingredients}
      onSave={handleSave}
      onRemove={handleRmove}
      hasNameError={nameError}
    />
  );
};
