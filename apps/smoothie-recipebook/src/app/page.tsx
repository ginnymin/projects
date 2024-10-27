import { Button } from '@components/Button';
import { RecipeList } from '@components/RecipeList';

export const metadata = {
  title: 'Smoothie Recipebook',
  description: 'Create and manage your smoothie recipes',
};

const Page = () => {
  return (
    <div className="flex flex-col w-5/6 sm:w-[456px]">
      <RecipeList />
      <Button className="mt-4 self-end" kind="link" href="/recipe" size="large">
        Add a recipe
      </Button>
    </div>
  );
};

export default Page;
