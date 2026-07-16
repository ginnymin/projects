"use client";

import { store } from "@store/score";
import { type FC, type HTMLAttributes, useSyncExternalStore } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const Score: FC<Props> = () => {
  const score = useSyncExternalStore(store.subscribe, store.getScore, store.getServerScore);

  return (
    <div className="flex flex-col items-center justify-around bg-white text-primary-dark rounded-sm md:rounded-lg px-5 py-2 md:px-10 md:py-3">
      <h2 className="text-primary-score uppercase text-xs md:text-base">Score</h2>
      <span className="text-4xl md:text-[4rem] leading-none font-bold">{score}</span>
    </div>
  );
};
