'use client';

import clsx from 'clsx';
import Image from 'next/image';
import type { FC, HTMLAttributes } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { HandType } from '@components/constants';
import { BoardHand as Hand } from '@components/Hand';
import { store } from '@store/progress';

import Background from './bg-pentagon.svg';
import { useOnResize } from './useOnResize';

type Props = HTMLAttributes<HTMLElement>;

const BACKGROUND_WIDTH = 329;

export const Board: FC<Props> = (props) => {
  const ref = useRef<HTMLImageElement>(null);
  const initialWidth = useRef<number>(BACKGROUND_WIDTH);
  const [ratio, setRatio] = useState(1);
  const [ready, setReady] = useState(false);

  const style = useMemo(() => ({ transform: `scale(${ratio})` }), [ratio]);

  const handleClick = useCallback(
    (type: HandType) => () => {
      store.setPlayerChoice(type);
    },
    []
  );

  const handleResize = useCallback(() => {
    if (ref.current?.clientWidth !== undefined) {
      setRatio(ref.current.clientWidth / initialWidth.current);
    }
  }, []);

  useOnResize(handleResize, 100);

  useEffect(() => {
    if (ref.current?.clientWidth !== undefined) {
      handleResize();
      setReady(true);
    }
  }, [handleResize]);

  return (
    <div
      {...props}
      className={clsx(
        'relative flex items-center justify-center p-14 xs:p-16 transition max-w-[360px] xs:max-w-[400px] md:max-w-none',
        { 'opacity-0': !ready }
      )}
    >
      <Image ref={ref} src={Background} alt="" />
      <div className="absolute transition" role="region" style={style}>
        <h2 className="sr-only">Choose a hand:</h2>
        {Object.values(HandType).map((type, index) => {
          return (
            <Hand
              key={type}
              index={index}
              type={type}
              onClick={handleClick(type)}
            />
          );
        })}
      </div>
    </div>
  );
};
