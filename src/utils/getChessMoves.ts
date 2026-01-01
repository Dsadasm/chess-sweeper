// Take chess piece type and position, return possible moves
export default function getChessMoves(
  type: string,
  row: number,
  col: number
): number[][] {
  const isValid = (r: number, c: number) =>
    r >= 0 && r < 10 && c >= 0 && c < 10;

  // If starting position is out of board bounds, return empty list
  if (row < 0 || col < 0 || row >= 10 || col >= 10) return [];

  switch (type) {
    case "pawn": {
      const moves = [
        [row + 1, col],
        [row + 2, col],
      ];
      return moves.filter(([r, c]) => isValid(r, c));
    }
    case "rook": {
      const moves: number[][] = [];
      // vertical up
      for (let r = row + 1; r < 10; r++) moves.push([r, col]);
      // vertical down
      for (let r = row - 1; r >= 0; r--) moves.push([r, col]);
      // horizontal right
      for (let c = col + 1; c < 10; c++) moves.push([row, c]);
      // horizontal left
      for (let c = col - 1; c >= 0; c--) moves.push([row, c]);
      return moves.filter(([r, c]) => isValid(r, c));
    }
    case "knight": {
      const moves = [
        [row + 2, col + 1],
        [row + 2, col - 1],
        [row - 2, col + 1],
        [row - 2, col - 1],
        [row + 1, col + 2],
        [row + 1, col - 2],
        [row - 1, col + 2],
        [row - 1, col - 2],
      ];
      return moves.filter(([r, c]) => isValid(r, c));
    }
    case "bishop": {
      const moves: number[][] = [];
      // down-right
      for (let r = row + 1, c = col + 1; r < 10 && c < 10; r++, c++)
        moves.push([r, c]);
      // down-left
      for (let r = row + 1, c = col - 1; r < 10 && c >= 0; r++, c--)
        moves.push([r, c]);
      // up-right
      for (let r = row - 1, c = col + 1; r >= 0 && c < 10; r--, c++)
        moves.push([r, c]);
      // up-left
      for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--)
        moves.push([r, c]);
      return moves.filter(([r, c]) => isValid(r, c));
    }
    case "queen": {
      const moves = [
        ...getChessMoves("rook", row, col),
        ...getChessMoves("bishop", row, col),
      ];
      return moves.filter(([r, c]) => isValid(r, c));
    }
    case "king": {
      const moves = [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
        [row + 1, col + 1],
        [row + 1, col - 1],
        [row - 1, col + 1],
        [row - 1, col - 1],
      ];
      return moves.filter(([r, c]) => isValid(r, c));
    }
    default:
      return [];
  }
}
