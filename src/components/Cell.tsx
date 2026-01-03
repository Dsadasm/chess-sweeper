import styles from "./Cell.module.css";

interface CellProps {
  value: number | string;
  isRevealed?: boolean;
  onClick?: () => void;
}

export default function Cell({ value, isRevealed, onClick }: CellProps) {
  const base = styles.cell;
  const stateClass = !isRevealed ? styles.unrevealed : styles.revealed;

  // Determine value class based on the cell's value
  let valueClass = "";
  if (isRevealed) {
    if (typeof value === "number" && value > 0) {
      valueClass = styles[`val${value}`] || "";
    } else if (typeof value === "string") {
      valueClass = styles.revealedPiece;
    }
  }

  const classes = [base, stateClass, valueClass].filter(Boolean).join(" ");

  return (
    <div className={classes} onClick={onClick}>
      {isRevealed ? (value !== 0 ? value : "") : ""}
    </div>
  );
}
