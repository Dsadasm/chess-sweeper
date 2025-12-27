import styles from "./Test.module.css";
import { Board, Cell } from "../utils/test";
import { useState } from "react";

export default function Test() {
  const [board, setBoard] = useState<Board>(
    new Board([
      [new Cell(1), new Cell(2), new Cell(3)],
      [new Cell(4), new Cell(5), new Cell(6)],
      [new Cell(7), new Cell(8), new Cell(9)],
    ])
  );

  const handleClick = () => {
    const newCells = board.cells.map((row) =>
      row.map(
        (cell) => new Cell(cell.value === null ? 0 : (cell.value as number) + 1)
      )
    );
    setBoard(new Board(newCells));
  };

  return (
    <>
      <button onClick={handleClick}>Test</button>
      <div className={styles.board}>
        {board.cells.map((row, rowIndex) => (
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
