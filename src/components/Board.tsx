import styles from "./Board.module.css";
import CellComponent from "./Cell";
import type { Cell } from "../hooks/useInitBoard";

interface BoardProps {
  cells: Cell[][]; // adding these here so Sweeper can access
  onCellClick: (row: number, col: number) => void;
}

export default function Board({ cells, onCellClick }: BoardProps) {
  return (
    <div className={styles.board}>
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <CellComponent
              key={cellIndex}
              value={cell.value}
              isRevealed={cell.isRevealed}
              onClick={() => onCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
