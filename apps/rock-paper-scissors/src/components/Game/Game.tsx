"use client";

import { Board } from "@components/Board";
import { Result } from "@components/Result";
import type { FC, HTMLAttributes } from "react";

import { useProgress } from "./useProgress";

type Props = HTMLAttributes<HTMLElement>;

export const Game: FC<Props> = () => {
  const { choice, houseChoice, result } = useProgress();

  if (choice === undefined) {
    return <Board />;
  }

  if (houseChoice === undefined) {
    return <Result choice={choice} />;
  }

  return <Result choice={choice} houseChoice={houseChoice} result={result} />;
};
