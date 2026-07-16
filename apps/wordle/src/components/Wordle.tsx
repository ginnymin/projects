import { useEffect, useRef, useState } from "react";

import { Guess } from "./Guess";
import { Keyboard } from "./Keyboard";
import styles from "./Wordle.module.css";

const WORDS = Object.freeze([
  "APPLE",
  "BEAST",
  "FAINT",
  "FEAST",
  "FRUIT",
  "GAMES",
  "PAINT",
  "PASTE",
  "TOWER",
  "REACT",
]);

const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const TOTAL_GUESSES = 6;

export const Wordle = () => {
  const [targetWord, setTargetWord] = useState(randomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const isComplete = guesses.length === TOTAL_GUESSES;
  const isCorrect = guesses.some((guess) => guess.toUpperCase() === targetWord.toUpperCase());
  const showReset = isComplete || isCorrect;

  const reset = () => {
    setGuesses([]);
    setCurrentGuess("");
    setTargetWord(randomWord());
  };
  const handleDelete = () => {
    if (showReset) return;
    setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
  };
  const handleEnter = () => {
    if (showReset || currentGuess.length < 5) return;
    setGuesses((prev) => [...prev, currentGuess]);
    setCurrentGuess("");
  };
  const handleLetter = (letter: string) => {
    if (showReset || currentGuess.length >= 5) return;

    setCurrentGuess((prev) => prev + letter.toUpperCase());
  };

  const keydown = (e: KeyboardEvent) => {
    if (showReset || e.metaKey || e.ctrlKey) return;

    if (e.key === "Enter") {
      handleEnter();
      return;
    }

    if (e.key === "Backspace") {
      handleDelete();
      return;
    }

    const regex = /[a-z]/i;

    if (e.key.length > 1 || !regex.test(e.key)) return;

    setCurrentGuess((prev) => {
      if (prev.length < 5) {
        return prev + e.key.toUpperCase();
      }
      return prev;
    });
  };

  const keydownRef = useRef(keydown);

  useEffect(() => {
    keydownRef.current = keydown;
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => keydownRef.current(e);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    console.log("target word: ", targetWord);
  }, [targetWord]);

  return (
    <div className="m-4">
      <div className="flex justify-center items-center gap-3 mb-3">
        <h1 className="text-center">Wordle</h1>
        {showReset && (
          <button type="button" className={styles["reset-button"]} onClick={reset}>
            Reset
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {guesses.map((guess, index) => {
          const key = `guess-${guess}-${index}`;
          return <Guess key={key} guess={guess} word={targetWord} />;
        })}

        {!isComplete && <Guess guess={currentGuess} />}

        {!isComplete &&
          Array.from({ length: TOTAL_GUESSES - guesses.length - 1 }).map((_, index) => {
            const key = `empty-guess-${index}`;
            return <Guess key={key} />;
          })}
      </div>
      <Keyboard
        guesses={guesses}
        word={targetWord}
        onLetterPress={handleLetter}
        onEnter={handleEnter}
        onDelete={handleDelete}
      />
    </div>
  );
};
