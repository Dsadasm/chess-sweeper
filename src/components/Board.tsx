import styles from "./Board.module.css";
import CellComponent from "./Cell";
import type { Cell } from "../hooks/useInitBoard";

interface BoardProps {
  state: "reveal" | "guess";
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  guessChessType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  cells : Cell[][]; // adding these here so Sweeper can access
  setCells : React.Dispatch<React.SetStateAction<Cell[][]>>;
  isRandom: boolean;
}

export default function Board({ state, setPoint, guessChessType, cells, setCells, isRandom = true }: BoardProps) {
  const colSize = 10;
  const rowSize = 10;
  // init board at Sweeper instead

  // Reveal cells recursively from row, col
  // Returns the points gained from the reveal
  const revealCells = (
    mCells: Cell[][],
    row: number,
    col: number,
    step: number = 0
  ): number => {
    if (row < 0 || col < 0 || row >= rowSize || col >= colSize) return 0;
    else if (mCells[row][col].isRevealed) return 0;
    else if (step === 0) {
      // Return if it is a chess piece
      if (typeof mCells[row][col].value === "string") {
        mCells[row][col].isRevealed = true;
        return -5;
      }

      // if the value 0, it will be revealed in the next steps
      if (mCells[row][col].value > 0) {
        mCells[row][col].isRevealed = true;
      }

      // Reveal 3x3 area around the clicked cell that have value 0
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          // Skip out-of-bounds neighbors
          if (r < 0 || c < 0 || r >= rowSize || c >= colSize) continue;
          if (mCells[r][c].value === 0) {
            revealCells(mCells, r, c, step + 1);
          }
        }
      }

      return -1;
    } else {
      mCells[row][col].isRevealed = true;

      // Do normal minesweeper reveal for step > 0
      if (mCells[row][col].value === 0) {
        revealCells(mCells, row + 1, col, step + 1);
        revealCells(mCells, row - 1, col, step + 1);
        revealCells(mCells, row, col + 1, step + 1);
        revealCells(mCells, row, col - 1, step + 1);
      }
    }

    return 0;
  };

  // Guess the piece at (row, col)
  // Returns points gained from the guess
  const guessPiece = (row: number, col: number): number => {
    if (guessChessType === undefined) return 0;
    else if (cells[row][col].value === guessChessType) {
      return 3;
    }
    return -3;
  };

  // Handle cell click based on current state
  const handleCellClick = (row: number, col: number) => {
    if (state === "guess") {
      const pointsGained = guessPiece(row, col);
      setPoint((prev) => prev + pointsGained);
    } else if (state == "reveal") {
      const newCells = [...cells];
      const pointsGained = revealCells(newCells, row, col);
      setCells(newCells);
      setPoint((prev) => prev + pointsGained);
    }
  };

  return (
    <div className={styles.board}>
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <CellComponent
              key={cellIndex}
              value={cell.value}
              isRevealed={cell.isRevealed}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
