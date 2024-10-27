import { CloseButton, ModalTitle } from '@components/Modal';
import { Recipe } from '@components/Recipe';

export const metadata = {
  title: 'Recipe detail',
  description:
    'How the game works, who beats who. A fun little project from ginnymin.com',
};

const Page = ({ params: { id } }: { params: { id: string[] | undefined } }) => {
  return (
    <div className="sm:w-[75vw] sm:max-w-3xl">
      <div className="flex justify-between mb-2">
        <ModalTitle>
          {id === undefined ? 'New recipe' : 'View/edit recipe'}
        </ModalTitle>
        <CloseButton className="md:order-2" iconAlt="Close and go back" />
      </div>
      <Recipe id={Array.isArray(id) ? id[0] : id} />
    </div>
  );
};

export default Page;
