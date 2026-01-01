import { useEffect, useState } from "react";
import getChessMoves from "../utils/getChessMoves";

export interface Cell {
  value: string | number;
  isRevealed: boolean;
}

export default function useInitBoard(
  colSize: number,
  rowSize: number
): [Cell[][], React.Dispatch<React.SetStateAction<Cell[][]>>] {
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
      const moves: number[][] = getChessMoves(piece.type, piece.row, piece.col);
      moves.forEach(([r, c]) => {
        if (newCells[r][c].value === 0) {
          newCells[r][c].value = 1;
        } else if (typeof newCells[r][c].value === "number") {
          newCells[r][c].value = (newCells[r][c].value as number) + 1;
        }
      });
    });

    setCells(newCells);
  }, []);

  return [cells, setCells];
}
