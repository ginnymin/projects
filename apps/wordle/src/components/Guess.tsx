import clsx from "clsx";

import styles from "./Wordle.module.css";

const WORD_LENGTH = 5;

const getGuessLetterStates = (guess: string, word: string) => {
  // Remove the correct letters from the word
  const wordWithoutCorrectLetters = word
    .split("")
    .reduce(
      (prev: string, letter, index) => (letter !== guess.charAt(index) ? prev + letter : prev),
      "",
    );

  // Calculate guess's letter states
  return guess.split("").map((letter, index) => {
    if (letter === word.charAt(index)) {
      return "correct";
    }
    if (wordWithoutCorrectLetters.includes(letter)) {
      return "present";
    }
    return "absent";
  });
};

const Square = ({
  letter,
  state = "default",
}: {
  letter?: string;
  state?: "correct" | "present" | "absent" | "default";
}) => {
  return <div className={clsx(styles.square, styles[state])}>{letter}</div>;
};

export const Guess = ({ guess, word }: { guess?: string; word?: string }) => {
  const letterStates = guess && word ? getGuessLetterStates(guess, word) : [];
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: WORD_LENGTH }).map((_, index) => {
        const letter = guess?.[index];
        const key = `${index}-${letter ?? "empty"}`;
        return <Square key={key} letter={letter} state={letterStates?.[index]} />;
      })}
    </div>
  );
};
