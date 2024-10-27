import { useCallback, useEffect, useState } from 'react';

import {
  init,
  get as getData,
  add as addData,
  update as updateData,
  remove as removeData,
  StoreNames,
} from './store';
import { Recipe } from './types';

let allRecipes: Recipe[];

export const useStore = () => {
  const [, setInitialized] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllRecipes = useCallback(() => allRecipes, []);

  const getAll = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const result = await getData<Recipe>(StoreNames.Recipes);
      setLoading(false);
      allRecipes = result;
      return result;
    } catch (_e) {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  const get = useCallback(async (key: number) => {
    setError(false);
    setLoading(true);
    try {
      const result = await getData<Recipe>(StoreNames.Recipes, key);
      setLoading(false);
      return result;
    } catch (_e) {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  const add = useCallback(async (data: Omit<Recipe, 'id'>) => {
    setError(false);
    setLoading(true);
    try {
      const result = await addData<Omit<Recipe, 'id'>>(
        StoreNames.Recipes,
        data
      );
      setLoading(false);
      return result;
    } catch (_e) {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  const update = useCallback(async (key: number, data: Recipe) => {
    setError(false);
    setLoading(true);
    try {
      const result = await updateData<Recipe>(StoreNames.Recipes, key, data);
      setLoading(false);
      return result;
    } catch (_e) {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  const remove = useCallback(async (key: number) => {
    setError(false);
    setLoading(true);
    try {
      const result = await removeData(StoreNames.Recipes, key);
      setLoading(false);
      return result;
    } catch (_e) {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  useEffect(() => {
    // initialize the store
    init<Recipe>(StoreNames.Recipes, 'id')
      .then((result) => {
        setInitialized(result);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return {
    getAll,
    get,
    add,
    update,
    remove,
    error,
    loading,
    getAllRecipes,
  };
};
