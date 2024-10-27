export type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  quantity: number;
  unit: string;
  name: string;
};
