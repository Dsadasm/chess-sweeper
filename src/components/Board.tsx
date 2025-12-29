import styles from "./Board.module.css";
import { useEffect, useState } from "react";
import CellComponent from "./Cell";
import getChessMove from "../utils/getChessMove";

interface Cell {
  value: string | number;
}

export default function Board() {
  const [cells, setCells] = useState<Cell[][]>([]);
  const chessTypes: string[] = [
    "pawn",
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
  ] as const;
  const chessPieces = chessTypes.map((type) => ({ type, row: -1, col: -1 }));

  useEffect(() => {
    const initializeCells = () => {
      // Initialize a 10x10 board with 0
      const newCells: Cell[][] = [];
      for (let i = 0; i < 10; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 10; j++) {
          row.push({ value: 0 });
        }
        newCells.push(row);
      }

      // Randomly place piece on the board
      chessPieces.forEach((piece) => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        piece.row = row;
        piece.col = col;
        newCells[row][col] = { value: piece.type };
      });

      // Calculate possible moves for each piece and update cell values
      chessPieces.forEach((piece) => {
        const moves: number[][] = getChessMove(piece.type, piece.row, piece.col);
        moves.forEach(([r, c]) => {
          if (newCells[r][c].value === 0) {
            newCells[r][c].value = 1;
          } else if (typeof newCells[r][c].value === "number") {
            newCells[r][c].value = (newCells[r][c].value as number) + 1;
          }
        });
      })

      setCells(newCells);
    };

    initializeCells();
  }, []);

  return (
    <>
      <div className={styles.board}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <CellComponent key={cellIndex} value={cell.value} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
