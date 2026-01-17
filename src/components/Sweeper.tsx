// Contains all main parts of ChessSweeper (i.e. Board + other UI parts)
import Board from "../components/Board";
import GamePopup from "../components/GamePopup";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Sweeper.module.css";
import useInitBoard from "../hooks/useInitBoard"; // Import the hook
import { initBoard, type Cell } from "../hooks/useInitBoard";
import getChessMoves from "../utils/getChessMoves";

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

export default function SweeperLayout({ isBoardRandom = true }: SweeperProps) {
  // Init board state here
  const rowSize = 10;
  const colSize = 10;
  const [cells, setCells, chessPiecesRef] = useInitBoard(
    rowSize,
    colSize,
    isBoardRandom,
  );
  const [boardState, setBoardState] = useState<"reveal" | "guess">("reveal");
  const [point, setPoint] = useState(15);
  const pieceCounts = useMemo(() => countPieces(cells), [cells]);

  // Current selected piece
  const [selectedPieceType, setSelectedPieceType] = useState<
    "pawn" | "rook" | "knight" | "bishop" | "queen" | "king" | undefined
  >(undefined);
  const [gameState, setGameState] = useState<
    "waiting" | "playing" | "won" | "lost"
  >("waiting");

  // Timer
  const [timeLeft, setTimeLeft] = useState(180);
  const timerRef = useRef<number | null>(null);

  // Popup
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  const popupTitle =
    gameState === "won" ? "Congratulations! You Won!" : "Game Over!";
  const popupText =
    gameState === "won"
      ? `You found all chess pieces with ${point} points and ${formatTime(
          timeLeft,
        )} remaining!`
      : `${point < 0 ? "You lost!" : "You flagged!"} ${Object.values(
          pieceCounts,
        ).reduce((a, b) => a + b, 0)} pieces remaining.`;

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Only start timer on first click
    if (gameState === "playing") {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            // Stop at 0
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            // Check win condition when time runs out
            checkWinCondition();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Clean up on unmount or when gameState changes
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  // Check win/lose conditions when points or piece counts change
  useEffect(() => {
    if (gameState === "playing") {
      checkWinCondition();
    }
  }, [point, pieceCounts, timeLeft]);

  const checkWinCondition = () => {
    if (gameState === "waiting") return;

    // Calculate total pieces left
    const totalPiecesLeft = Object.values(pieceCounts).reduce(
      (sum, count) => sum + count,
      0,
    );

    // Lose if no more points
    if (point < 0) {
      setGameState("lost");
      openPopup();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    // Win if no pieces left
    if (totalPiecesLeft === 0) {
      setGameState("won");
      openPopup();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }
  };

  // Function when guess button is toggled
  const handleGuessButtonToggle = () => {
    if (boardState === "reveal") {
      setBoardState("guess");
    } else {
      setBoardState("reveal");
      setSelectedPieceType(undefined); // Clear piece selection
    }
  };

  // Cell click handler
  const handleCellClick = (row: number, col: number) => {
    if (gameState === "waiting") {
      setGameState("playing");
    }

    const newCells = [...cells];
    const pointsGain =
      boardState === "reveal"
        ? revealCells(newCells, row, col)
        : guessPiece(selectedPieceType, row, col, newCells);

    setCells(newCells);
    setPoint((prevPoint) => prevPoint + pointsGain);
    setSelectedPieceType(undefined);
  };

  // ADD: Function to handle piece selection
  const handlePieceSelect = (
    pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king",
  ) => {
    // Only allow selection in guess mode
    if (boardState !== "guess") return;

    if (selectedPieceType === pieceType) {
      setSelectedPieceType(undefined);
    } else {
      setSelectedPieceType(pieceType);
    }
  };

  // Ignore attack from revealed chess pieces
  const handleToggleResolved = () => {
    const newCells = [...cells];

    chessPiecesRef.current.forEach((piece) => {
      if (newCells[piece.row][piece.col].isRevealed && !piece.isResolved) {
        const moves = getChessMoves(piece.type, piece.row, piece.col);
        moves.forEach(([r, c]) => {
          if (typeof newCells[r][c].value === "number") {
            newCells[r][c].value--;
          }
        });
        piece.isResolved = true;
      }
    });

    setCells(newCells);
  };

  // Reset everything
  const handlePlayAgain = () => {
    const newCells = initBoard(rowSize, colSize, isBoardRandom, chessPiecesRef);
    setCells(newCells);
    setTimeLeft(180);
    timerRef.current = null;
    setPoint(15);
    setBoardState("reveal");
    setGameState("waiting");
    setSelectedPieceType(undefined);
    setShowPopup(false);
  };

  // Upload daily record
  const handleUploadDialyRecord = async (name: string) => {
    const url = "http://127.0.0.1:8000/api/dailyrecords/";
    const body = JSON.stringify({
      name: name,
      point: point,
      time: timeLeft.toString(),
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Daily Record Uploaded");
    setShowPopup(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* MAIN SECTION */}
        <main className={styles.mainContent}>
          {/* BOARD */}
          <div className={styles.item}>
            <Board
              cells={cells} // Pass cells to Board
              onCellClick={handleCellClick} // Pass cell click handler
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
                  className={`${styles.button} ${
                    boardState === "guess" ? styles.active : ""
                  }`}
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
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "king" ? styles.selected : ""
                    }`}
                    onClick={() => handlePieceSelect("king")}
                    disabled={boardState !== "guess" || pieceCounts.king === 0}
                  >
                    <img src={wK} alt="King"></img>
                  </button>
                  <p className={styles.pieceCountDisplay}>{pieceCounts.king}</p>
                  <button
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "queen" ? styles.selected : ""
                    }`}
                    onClick={() => handlePieceSelect("queen")}
                    disabled={boardState !== "guess" || pieceCounts.queen === 0}
                  >
                    <img src={wQ} alt="Queen"></img>
                  </button>
                  <p className={styles.pieceCountDisplay}>
                    {pieceCounts.queen}
                  </p>
                  <button
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "rook" ? styles.selected : ""
                    }`}
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
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "bishop" ? styles.selected : ""
                    }`}
                    onClick={() => handlePieceSelect("bishop")}
                    disabled={
                      boardState !== "guess" || pieceCounts.bishop === 0
                    }
                  >
                    <img src={wB} alt="Bishop"></img>
                  </button>
                  <p className={styles.pieceCountDisplay}>
                    {pieceCounts.bishop}
                  </p>
                  <button
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "knight" ? styles.selected : ""
                    }`}
                    onClick={() => handlePieceSelect("knight")}
                    disabled={
                      boardState !== "guess" || pieceCounts.knight === 0
                    }
                  >
                    <img src={wN} alt="Knight"></img>
                  </button>
                  <p className={styles.pieceCountDisplay}>
                    {pieceCounts.knight}
                  </p>
                  <button
                    className={`${styles.pieceButton} ${
                      selectedPieceType === "pawn" ? styles.selected : ""
                    }`}
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
                <button
                  className={styles.button}
                  onClick={() => handleToggleResolved()}
                >
                  Toggle Resolved
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
      {showPopup && (
        <GamePopup
          onClose={closePopup}
          onUpload={handleUploadDialyRecord}
          onPlayAgain={handlePlayAgain}
          isBoardRandom={isBoardRandom}
          isWon={gameState == "won"}
          title={popupTitle}
          text={popupText}
        />
      )}
    </>
  );
}

const countPieces = (cells: Cell[][]) => {
  const counts = {
    pawn: 0,
    rook: 0,
    knight: 0,
    bishop: 0,
    queen: 0,
    king: 0,
  };

  cells.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.isRevealed && typeof cell.value === "string") {
        const pieceType = cell.value as keyof typeof counts;
        if (counts.hasOwnProperty(pieceType)) {
          counts[pieceType] += 1;
        }
      }
    });
  });

  return counts;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Reveal cells recursively from row, col
// Returns the points gained from the reveal
const revealCells = (
  mCells: Cell[][],
  row: number,
  col: number,
  step: number = 0,
  rowSize: number = 10,
  colSize: number = 10,
): number => {
  if (row < 0 || col < 0 || row >= rowSize || col >= colSize) return 0;
  else if (mCells[row][col].isRevealed) return 0;
  else if (step === 0) {
    // Return if it is a chess piece
    if (typeof mCells[row][col].value === "string") {
      mCells[row][col].isRevealed = true;
      return -5;
    }

    // if the value 0, it will be revealed in the next steps
    if (mCells[row][col].value > 0) {
      mCells[row][col].isRevealed = true;
    }

    // Reveal 3x3 area around the clicked cell that have value 0
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        // Skip out-of-bounds neighbors
        if (r < 0 || c < 0 || r >= rowSize || c >= colSize) continue;
        if (mCells[r][c].value === 0) {
          revealCells(mCells, r, c, step + 1);
        }
      }
    }

    return -1;
  } else {
    mCells[row][col].isRevealed = true;

    // Do normal minesweeper reveal for step > 0
    if (mCells[row][col].value === 0) {
      revealCells(mCells, row + 1, col, step + 1);
      revealCells(mCells, row - 1, col, step + 1);
      revealCells(mCells, row, col + 1, step + 1);
      revealCells(mCells, row, col - 1, step + 1);
    }
  }

  return 0;
};

// Guess the piece at (row, col)
// Returns points gained from the guess
const guessPiece = (
  type: string | undefined,
  row: number,
  col: number,
  mCells: Cell[][],
): number => {
  if (type === undefined) return 0;
  else if (mCells[row][col].isRevealed) return 0;
  else if (mCells[row][col].value === type) {
    // Reveal single cell on correct guess
    mCells[row][col].isRevealed = true;
    return 3;
  }
  return -3;
};
