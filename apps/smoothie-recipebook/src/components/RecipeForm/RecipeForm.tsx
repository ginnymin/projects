import {
  ChangeEventHandler,
  useState,
  type FC,
  type HTMLAttributes,
} from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Ingredient as IngredientType, Recipe } from '@store/types';

import { Ingredient } from './Ingredient';

type Props = HTMLAttributes<HTMLElement> & {
  onSave: (data: Omit<Recipe, 'id'>) => void;
  onRemove?: () => void;
  ingredients?: IngredientType[];
  name?: string;
  hasNameError?: boolean;
};

export const RecipeForm: FC<Props> = ({
  ingredients: ingredientsProp,
  name: nameProp,
  hasNameError,
  onSave,
  onRemove,
}) => {
  const [name, setName] = useState<Recipe['name']>(nameProp ?? '');

  const [ingredients, setIngredients] = useState<Recipe['ingredients']>(
    ingredientsProp ?? []
  );

  const isDisabled = ingredients.length === 0 || name.trim().length < 3;

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onAddIngredient = (data: IngredientType) => {
    setIngredients((prev) => [...prev, data]);
  };

  const onEditIngredient = (index: number) => (data: IngredientType) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) => {
        if (i === index) {
          return data;
        }

        return ingredient;
      })
    );
  };

  const onRemoveIngredient = (index: number) => () => {
    setIngredients((prev) => prev.filter((_ingredient, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ name: name.trim(), ingredients });
  };

  return (
    <div>
      <Input
        type="text"
        value={name}
        onChange={onNameChange}
        label={
          hasNameError
            ? 'Name (this one already exists, try a different one)'
            : 'Name'
        }
        id="recipe-name"
        error={hasNameError}
      />

      <h3 className="mt-4 mb-2 font-semibold">Add/edit ingredients:</h3>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-2 border-b-2 border-b-neutral-200 mb-2 pb-4">
          <Ingredient onSubmit={onAddIngredient} />
        </li>

        {ingredients.map((ingredient, index) => (
          <li key={`${ingredient.name}-${index}`} className="flex gap-2">
            <Ingredient
              ingredient={ingredient}
              onSubmit={onEditIngredient(index)}
              onRemove={onRemoveIngredient(index)}
            />
          </li>
        ))}
      </ul>

      {ingredients.length === 0 && (
        <p className="text-sm">
          No ingredients added yet! Add your first ingredient above.
        </p>
      )}

      <div className="flex gap-2">
        <Button
          className="mt-6"
          disabled={isDisabled}
          size="large"
          onClick={handleSave}
        >
          Save recipe!
        </Button>
        {onRemove !== undefined && (
          <Button
            className="mt-6"
            size="large"
            onClick={onRemove}
            variant="destructive"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
