import styles from "./Board.module.css";
import { useState } from "react";

interface Cell {
  value: string | number | null;
}

export default function Board() {
  const [cells, setCells] = useState<Cell[][]>([
    [{ value: 1 }, { value: 2 }, { value: 3 }],
    [{ value: 4 }, { value: 5 }, { value: 6 }],
    [{ value: 7 }, { value: 8 }, { value: 9 }],
  ]);

  const initializeCells = () => {
    // TODO: Implement initialization logic
  };

  const revealCell = (row: number, col: number) => {
    // TODO: Implement reveal logic
  };

  const guessCell = (row: number, col: number, guess: string) => {
    // TODO: Implement guess logic
  };

  // For testing purposes
  const handleClick = () => {
    const newCells = cells.map((row) =>
      row.map((cell) => ({
        value: cell.value === null ? 0 : (cell.value as number) + 1,
      }))
    );
    setCells(newCells);
  };

  // TODO: Need to make a new component for each cell
  return (
    <>
      <button onClick={handleClick}>Test</button>
      <div className={styles.board}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={styles.cell}>
                {cell.value !== null ? cell.value : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
