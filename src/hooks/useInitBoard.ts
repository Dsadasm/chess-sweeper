import { useEffect, useState } from "react";
import getChessMoves from "../utils/getChessMoves";
import LCG from "../utils/LCG";

export interface Cell {
  value: string | number;
  isRevealed: boolean;
}

export default function useInitBoard(
  colSize: number,
  rowSize: number,
  isRandom: boolean = true
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
  const rng = new LCG();

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

    // Place pieces by sampling without replacement (shuffle coordinates)
    const coords: number[][] = [];
    for (let r = 0; r < rowSize; r++) {
      for (let c = 0; c < colSize; c++) {
        coords.push([r, c]);
      }
    }

    // Fisher-Yates shuffle using either Math.random() or the seeded RNG
    for (let i = coords.length - 1; i > 0; i--) {
      const rand = isRandom ? Math.random() : rng.nextFloat();
      const j = Math.floor(rand * (i + 1));
      const tmp = coords[i];
      coords[i] = coords[j];
      coords[j] = tmp;
    }

    // Assign first N coordinates to the N pieces (unique positions)
    chessPieces.forEach((piece, index) => {
      const [row, col] = coords[index];
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
