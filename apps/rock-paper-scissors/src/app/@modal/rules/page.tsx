import Image from 'next/image';

import { CloseButton, ModalTitle } from '@components/Modal';

import RulesSVG from './image-rules-bonus.svg';

export const metadata = {
  title: 'Rules for Rock Paper Scissors Lizard Spock',
  description:
    'How the game works, who beats who. A fun little project from ginnymin.com',
};

const Rules = () => {
  return (
    <div className="h-full flex flex-col items-center justify-around md:justify-between md:flex-row md:flex-wrap md:max-w-[340px]">
      <ModalTitle>Rules</ModalTitle>
      <div className="md:order-3 md:basis-full md:mt-4">
        <Image
          src={RulesSVG}
          alt="Scissors beats Paper. Paper beats Rock. Rock beats Lizard. Lizard beats Spock. Spock beats Scissors. Scissors beats Lizard. Paper beats Spock. Rock beats Scissors. Lizard beats Paper. Spock beats Rock"
        />
        ;
      </div>
      <CloseButton className="md:order-2" iconAlt="Close rules" />
    </div>
  );
};

export default Rules;
