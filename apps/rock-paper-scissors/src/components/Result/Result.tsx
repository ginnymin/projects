'use client';

import clsx from 'clsx';
import { useCallback, type FC, type HTMLAttributes } from 'react';

import { Button } from '@components/Button';
import { HandType, ResultType } from '@components/constants';
import { ResultHand as Hand } from '@components/Hand';
import { store } from '@store/progress';

import { Choice } from './Choice';

type PendingProps = {
  houseChoice?: never;
  result?: never;
};

type HouseProps = {
  houseChoice: HandType;
  result?: never;
};

type ResultProps = {
  houseChoice: HandType;
  result: ResultType;
};

type UnionProps = PendingProps | HouseProps | ResultProps;

type Props = HTMLAttributes<HTMLDivElement> &
  UnionProps & {
    /**
     * The hand the player chose
     */
    choice: HandType;
  };

export const Result: FC<Props> = ({ choice, houseChoice, result }) => {
  const handClasses = 'order-1 md:order-2';

  const handlePlayAgain = useCallback(() => {
    store.reset();
  }, []);

  return (
    <div
      className={clsx(
        'flex items-center justify-around xs:justify-center flex-wrap md:flex-nowrap lg:mt-4 gap-0 xs:gap-8 lg:gap-16',
        { 'md:gap-14': result === undefined }
      )}
    >
      <Choice className="md:order-1">
        <Hand
          winner={result === ResultType.WIN}
          className={handClasses}
          type={choice}
          disabled
        />
      </Choice>
      <Choice className="md:order-3" player="house">
        {houseChoice === undefined ? (
          <Hand className={handClasses} type="empty" disabled />
        ) : (
          <Hand
            winner={result === ResultType.LOSE}
            className={handClasses}
            type={houseChoice}
            disabled
          />
        )}
      </Choice>
      {result !== undefined && (
        <div className="flex flex-col items-center gap-2 basis-full md:basis-auto md:order-2 mt-8 xs:mt-0">
          <h3 className="uppercase text-[3.4rem]">
            {result === ResultType.TIE ? "It's a tie" : <>You {result}</>}
          </h3>
          <Button size="large" variant="primary" onClick={handlePlayAgain}>
            Play again
          </Button>
        </div>
      )}
    </div>
  );
};
