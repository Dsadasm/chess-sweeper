import styles from "./Cell.module.css";
import wP from "../assets/wP.svg";
import wR from "../assets/wR.svg";
import wN from "../assets/wN.svg";
import wB from "../assets/wB.svg";
import wQ from "../assets/wQ.svg";
import wK from "../assets/wK.svg";

interface CellProps {
  value: number | string;
  isRevealed?: boolean;
  onClick?: () => void;
}

const pieceMap: Record<string, string> = {
  pawn: wP,
  rook: wR,
  knight: wN,
  bishop: wB,
  queen: wQ,
  king: wK,
};

export default function Cell({ value, isRevealed, onClick }: CellProps) {
  const base = styles.cell;
  const stateClass = !isRevealed ? styles.unrevealed : styles.revealed;

  // Determine value class based on numeric values for styling numbers
  let valueClass = "";
  if (isRevealed && typeof value === "number" && value > 0) {
    valueClass = styles[`val${value}`] || "";
  }
  const classes = [base, stateClass, valueClass].filter(Boolean).join(" ");

  // Compute render content for readability
  const content = () => {
    if (!isRevealed) return null;

    if (typeof value === "number") {
      return value !== 0 ? value : null;
    }

    if (typeof value === "string" && pieceMap[value]) {
      return <img src={pieceMap[value]} alt={value} className={styles.piece} />;
    }

    return null;
  };

  return (
    <div className={classes} onClick={onClick}>
      {content()}
    </div>
  );
}
