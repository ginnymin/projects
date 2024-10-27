import clsx from 'clsx';
import { ChangeEventHandler, FC, useState } from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Ingredient as IngredientType } from '@store/types';

type Props = {
  ingredient?: IngredientType;
  onSubmit: (data: IngredientType) => void;
  onRemove?: () => void;
};

const defaultIngredient = {
  quantity: 0,
  unit: 'tsp',
  name: '',
};

export const Ingredient: FC<Props> = ({ ingredient, onSubmit, onRemove }) => {
  const [newIngredient, setNewIngredient] = useState<IngredientType>(
    ingredient ?? defaultIngredient
  );

  const isEdit = ingredient !== undefined;

  const isDisabled = isEdit
    ? newIngredient.name.trim() === ingredient.name &&
      newIngredient.unit === ingredient.unit &&
      newIngredient.quantity === ingredient.quantity
    : newIngredient.name.trim().length < 3 || newIngredient.quantity <= 0;

  const onIngredientChange: (
    key: string
  ) => ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =
    (key) => (e) => {
      setNewIngredient((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    onSubmit({ ...newIngredient, quantity: Number(newIngredient.quantity) });

    if (!isEdit) {
      setNewIngredient(defaultIngredient);
    }
  };
  return (
    <>
      <Input
        value={newIngredient.quantity}
        onChange={onIngredientChange('quantity')}
        label="Quantity"
        id="ingredient-quantity"
        type="number"
        min={0}
        step={0.01}
        className="w-[7ch] md:w-[10ch]"
        hideLabel={isEdit}
      />
      <div className="flex flex-col">
        {!isEdit && (
          <label htmlFor="ingredient-unit" className="mb-1 text-sm">
            Unit
          </label>
        )}
        <select
          className="h-full rounded-md element-focus bg-neutral-100 px-3 py-2 w-full "
          value={newIngredient.unit}
          onChange={onIngredientChange('unit')}
          id="ingredient-unit"
          aria-label={isEdit ? 'Unit' : undefined}
        >
          <option>tsp</option>
          <option>tbsp</option>
          <option>cup</option>
          <option>oz</option>
          <option>pc</option>
        </select>
      </div>
      <Input
        value={newIngredient.name}
        onChange={onIngredientChange('name')}
        label="Ingredient"
        id="ingredient-name"
        type="text"
        className="flex-1"
        hideLabel={isEdit}
      />
      <Button
        className={clsx({ 'mt-6': !isEdit })}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        {isEdit ? 'Edit' : 'Add'}
      </Button>
      {isEdit && <Button onClick={onRemove}>Remove</Button>}
    </>
  );
};
