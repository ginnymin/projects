import clsx from "clsx";

import styles from "./Wordle.module.css";

const getLetterState = ({
  letter,
  word,
  guesses,
}: {
  letter: string;
  word?: string;
  guesses?: string[];
}) => {
  if (!word || !guesses) return "default";

  // Get the indexes of the letter in the word
  const letterIndexes = word.split("").reduce((prev: number[], l, index) => {
    if (l === letter) prev.push(index);
    return prev;
  }, []);
  const isGuessed = guesses.some((guess) => guess.toUpperCase().includes(letter.toUpperCase()));
  const isPresent = isGuessed && word.includes(letter);
  // Check if the letter is in the correct position for any of the guesses
  const isCorrect = guesses.some((guess) =>
    letterIndexes.some((index) => guess.toUpperCase().charAt(index) === word.charAt(index)),
  );

  return isCorrect ? "correct" : isPresent ? "present" : isGuessed ? "absent" : "default";
};

export const Keyboard = ({
  guesses,
  word,
  onLetterPress,
  onEnter,
  onDelete,
}: {
  guesses?: string[];
  word?: string;
  onLetterPress: (letter: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}) => {
  const letters = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  return (
    <div className="mt-4 flex flex-col gap-1">
      {letters.map((letterRow, index) => {
        const isLast = index === letters.length - 1;

        return (
          <div key={letterRow} className="flex justify-center gap-1">
            {isLast && (
              <button
                type="button"
                className={clsx(styles.letter, styles.default)}
                onClick={onEnter}
              >
                ENTER
              </button>
            )}
            {letterRow.split("").map((letter) => {
              return (
                <button
                  key={letter}
                  type="button"
                  className={clsx(styles.letter, styles[getLetterState({ letter, word, guesses })])}
                  onClick={() => onLetterPress(letter)}
                >
                  {letter}
                </button>
              );
            })}
            {isLast && (
              <button
                type="button"
                className={clsx(styles.letter, styles.default)}
                onClick={onDelete}
              >
                DEL
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
