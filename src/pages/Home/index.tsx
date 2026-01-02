import styles from "./index.module.css";

export default function HomeScreen() {
  return (
    <>
      <h1 className={styles.title}>Chess Sweeper</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>RANDOM</button>
        <button className={styles.button}>DAILY</button>
        <button className={styles.button}>RULES</button>
        <button className={styles.button}>LEADERBOARD</button>
      </div>
    </>
  );
}
