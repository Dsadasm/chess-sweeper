import styles from "./Cell.module.css";

interface CellProps {
  value: number | string;
  isRevealed?: boolean;
  onClick?: () => void;
}

export default function Cell({ value, isRevealed, onClick }: CellProps) {
  return (
    <div className={styles.cell} onClick={onClick}>
      {isRevealed ? (value !== 0 ? value : "") : "H"}
    </div>
  );
}
