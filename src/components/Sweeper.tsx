// Contains all main parts of ChessSweeper (i.e. Board + other UI parts)
import Board from "../components/Board";
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Sweeper.module.css";
import useInitBoard from "../hooks/useInitBoard"; // Import the hook

// Images
import wP from "../assets/wP.svg";
import wR from "../assets/wR.svg";
import wN from "../assets/wN.svg";
import wB from "../assets/wB.svg";
import wQ from "../assets/wQ.svg";
import wK from "../assets/wK.svg";

interface SweeperProps {
  isBoardRandom: boolean;
}

const countPieces = (cells: any[][]) => {
  const counts = {
    pawn: 0,
    rook: 0,
    knight: 0,
    bishop: 0,
    queen: 0,
    king: 0,
  };

  cells.forEach(row => {
    row.forEach(cell => {
      if (!cell.isRevealed && typeof cell.value === 'string') {
        const pieceType = cell.value as keyof typeof counts;
        if (counts.hasOwnProperty(pieceType)) {
          counts[pieceType] += 1;
        }
      }
    });
  });

  return counts;
};

export default function SweeperLayout({ isBoardRandom = true }: SweeperProps) {
  // Init board state here
  const colSize = 10;
  const rowSize = 10;
  const [cells, setCells] = useInitBoard(colSize, rowSize, isBoardRandom);

  const [boardState, setBoardState] = useState<"reveal" | "guess">("reveal");
  const [point, setPoint] = useState(15);

  // Current selected piece
  const [selectedPieceType, setSelectedPieceType] = useState<"pawn" | "rook" | "knight" | "bishop" | "queen" | "king" | undefined>(undefined);

  // Timer
  const [timeLeft, setTimeLeft] = useState(180);

  // Ref to store interval ID
  const timerRef = useRef<number | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Set up the timer interval
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          // Stop at 0
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const pieceCounts = useMemo(() => countPieces(cells), [cells]);

  // Function when guess button is toggled
  const handleGuessButtonToggle = () => {
    if (boardState === "reveal") {
      setBoardState("guess");
    } else {
      setBoardState("reveal");
      setSelectedPieceType(undefined); // Clear piece selection
    }
  };

  // ADD: Function to handle piece selection
  const handlePieceSelect = (pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king") => {
    // Only allow selection in guess mode
    if (boardState !== "guess") return;
    
    if (selectedPieceType === pieceType) {
      setSelectedPieceType(undefined);
    } else {
      setSelectedPieceType(pieceType);
    }
  };

  return (
    <div className={styles.container}>
      {/* MAIN SECTION */}
      <main className={styles.mainContent}>
        {/* BOARD */}
        <div className={styles.item}>
          <Board
            state={boardState}
            setPoint={setPoint}
            cells={cells} // Pass cells to Board
            setCells={setCells} // Pass setCells to Board
            isRandom={isBoardRandom}
            guessChessType={selectedPieceType}
          />
        </div>

        {/* SIDE BAR TO THE RIGHT (a bunch of buttons) */}
        <div className={styles.item}>
          <aside className={styles.sidePanel}>
            {/* ROW 1: TIMER & SCORE (NOT FUNCTIONAL YET)*/}
            <div className={styles.buttonRow}>
              <div className={styles.buttonGroup}>
                <p className={styles.textDisplay}> {formatTime(timeLeft)} </p>
                <p className={styles.textDisplay}> {point} </p>
              </div>
            </div>

            {/* ROW 2: Action Buttons */}
            <div className={styles.buttonRow}>
              <button 
                className={`${styles.button} ${boardState === "guess" ? styles.active : ""}`} 
                onClick={handleGuessButtonToggle}
              >
                {"Guess"}
              </button>
            </div>

            {/* ROW 3: Pieces Left */}
            <div className={styles.buttonRow}>
              <h3 className={styles.rowTitle}>Pieces Left</h3>
              <div className={styles.buttonGroup}>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "king" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("king")}
                  disabled={boardState !== "guess" || pieceCounts.king === 0}
                >
                  <img src={wK} alt="King"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.king}</p>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "queen" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("queen")}
                  disabled={boardState !== "guess" || pieceCounts.queen === 0}
                >
                  <img src={wQ} alt="Queen"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.queen}</p>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "rook" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("rook")}
                  disabled={boardState !== "guess" || pieceCounts.rook === 0}
                >
                  <img src={wR} alt="Rook"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.rook}</p>
              </div>
            </div>

            {/* ROW 4: Pieces Left */}
            <div className={styles.buttonRow}>
              <div className={styles.buttonGroup}>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "bishop" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("bishop")}
                  disabled={boardState !== "guess" || pieceCounts.bishop === 0}
                >
                  <img src={wB} alt="Bishop"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.bishop}</p>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "knight" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("knight")}
                  disabled={boardState !== "guess" || pieceCounts.knight === 0}
                >
                  <img src={wN} alt="Knight"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.knight}</p>
                <button 
                  className={`${styles.pieceButton} ${selectedPieceType === "pawn" ? styles.selected : ""}`}
                  onClick={() => handlePieceSelect("pawn")}
                  disabled={boardState !== "guess" || pieceCounts.pawn === 0}
                >
                  <img src={wP} alt="Pawn"></img>
                </button>
                <p className={styles.pieceCountDisplay}>{pieceCounts.pawn}</p>
              </div>
            </div>

            {/* ROW 5: TOGGLE RESOLVED */}
            <div className={styles.buttonRow}>
              <button className={styles.button}>Toggle Resolved</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
