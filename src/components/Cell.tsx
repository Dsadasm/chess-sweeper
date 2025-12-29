import styles from "./Cell.module.css";

interface CellProps {
  value: number | string;
}

export default function Cell({ value }: CellProps) {
  return <div className={styles.cell}>{value !== 0 ? value : ""}</div>;
}
