import styles from "./Board.module.css";
import { useEffect, useState } from "react";
import CellComponent from "./Cell";
import getChessMove from "../utils/getChessMove";

interface Cell {
  value: string | number;
  isRevealed: boolean;
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
  const colSize = 10;
  const rowSize = 10;

  useEffect(() => {
    const initializeCells = () => {
      // Initialize a 10x10 board with 0
      const newCells: Cell[][] = [];
      for (let i = 0; i < colSize; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < rowSize; j++) {
          row.push({ value: 0, isRevealed: false });
        }
        newCells.push(row);
      }

      // Randomly place piece on the board
      chessPieces.forEach((piece) => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        piece.row = row;
        piece.col = col;
        newCells[row][col].value = piece.type;
      });

      // Calculate possible moves for each piece and update cell values
      chessPieces.forEach((piece) => {
        const moves: number[][] = getChessMove(
          piece.type,
          piece.row,
          piece.col
        );
        moves.forEach(([r, c]) => {
          if (newCells[r][c].value === 0) {
            newCells[r][c].value = 1;
          } else if (typeof newCells[r][c].value === "number") {
            newCells[r][c].value = (newCells[r][c].value as number) + 1;
          }
        });
      });

      setCells(newCells);
    };

    initializeCells();
  }, []);

  const revealCells = (
    mCells: Cell[][],
    row: number,
    col: number,
    step: number = 0
  ): void => {
    if (row < 0 || col < 0 || row >= rowSize || col >= colSize) return;
    else if (mCells[row][col].isRevealed) return;
    else if (step === 0) {
      mCells[row][col].isRevealed = true;

      // Return if it is a chess piece
      if (typeof mCells[row][col].value === "string") return;

      // Reveal 3x3 area around the clicked cell that have value 0
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (mCells[r][c].value === 0) {
            revealCells(mCells, r, c, step + 1);
          }
        }
      }
    } else {
      mCells[row][col].isRevealed = true;

      // Do normal minesweeper reveal for step > 0
      if (mCells[row][col].value !== 0) return;
      revealCells(mCells, row + 1, col, step + 1);
      revealCells(mCells, row - 1, col, step + 1);
      revealCells(mCells, row, col + 1, step + 1);
      revealCells(mCells, row, col - 1, step + 1);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    const newCells = [...cells];
    revealCells(newCells, row, col);
    setCells(newCells);
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
