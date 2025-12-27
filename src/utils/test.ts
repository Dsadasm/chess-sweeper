export class Cell {
  value: string | number | null;

  constructor(value: string | number | null) {
    this.value = value;
  }
}

export class Board {
  cells: Cell[][];

  constructor(cells: Cell[][]) {
    this.cells = cells;
  }
}
