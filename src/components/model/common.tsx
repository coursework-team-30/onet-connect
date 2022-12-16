export enum State {
  Start,
  InGame,
  Over,
}

export enum Outcome {
  WIN,
  LOST,
}

export interface position {
  x: number;
  y: number;
}

const base = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
];

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: number[]): number[] {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function getGrid(): number[][] {
  const arr: number[] = base.reduce((a, b) => [...a, ...b], []);
  const shuffledArr = shuffleArray(arr);
  const grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  while (shuffledArr.length) {
    grid.push([0, ...shuffledArr.splice(0, 12), 0]);
  }
  grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return grid;
}
