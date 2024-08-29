export const isServer = typeof window !== 'undefined';

export enum HandType {
  SCISSORS = 'scissors',
  PAPER = 'paper',
  ROCK = 'rock',
  LIZARD = 'lizard',
  SPOCK = 'spock',
}

export const NUMBER_OF_TYPES = Object.entries(HandType).length;

export enum ResultType {
  WIN = 'win',
  LOSE = 'lose',
  TIE = 'tie',
}
