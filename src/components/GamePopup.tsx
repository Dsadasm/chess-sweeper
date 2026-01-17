import { useState } from "react";
import styles from "./GamePopup.module.css";

interface GamePopupProps {
  onClose: () => void;
  onPlayAgain: () => void;
  onUpload: (name: string) => void;
  isBoardRandom: boolean;
  isWon: boolean;
  title: string;
  text: string;
}

export default function GamePopup({
  onClose,
  onPlayAgain,
  onUpload,
  isBoardRandom,
  isWon,
  title,
  text,
}: GamePopupProps) {
  const [playerName, setPlayerName] = useState("");

  const handleUpload = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }

    onUpload(playerName);
  };

  const content = () => {
    if (isBoardRandom) {
      return (
        <button className={styles.actionButton} onClick={onPlayAgain}>
          Play Again
        </button>
      );
    } else if (!isBoardRandom && isWon) {
      return (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUpload()}
            className={styles.nameInput}
          />
          <button className={styles.actionButton} onClick={handleUpload}>
            Upload
          </button>
        </>
      );
    } else if (!isBoardRandom && !isWon) {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{title}</h2>
        <p>{text}</p>
        {content()}
      </div>
    </div>
  );
}
