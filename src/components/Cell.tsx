import styles from "./Cell.module.css";

interface CellProps {
  value: number | string;
  isRevealed?: boolean;
  onClick?: () => void;
}

export default function Cell({ value, isRevealed, onClick }: CellProps) {
  const classes = `${styles.cell} ${!isRevealed ? styles.unrevealed : ""}`.trim();

  return (
    <div className={classes} onClick={onClick}>
      {isRevealed ? (value !== 0 ? value : "") : "H"}
    </div>
  );
} 
