// Contains all main parts of ChessSweeper (i.e. Board + other UI parts)
import Board from '../components/Board';
import React, { useState } from 'react';
import styles from './Sweeper.module.css';

// Images
import wP from "../assets/wP.svg";
import wR from "../assets/wR.svg";
import wN from "../assets/wN.svg";
import wB from "../assets/wB.svg";
import wQ from "../assets/wQ.svg";
import wK from "../assets/wK.svg";

interface SweeperProps {
    // Add props needed
}

export default function SweeperLayout() {
  const [boardState, setBoardState] = useState<"reveal" | "guess">("reveal");
  const [point, setPoint] = useState(15);

  return (
    <div className="styles.container">

      {/* MAIN SECTION */}
      <main className={styles.mainContent}>
        {/* BOARD */}
        <div className={styles.item}>
            <Board state={boardState} setPoint={setPoint} />
        </div>

        {/* SIDE BAR TO THE RIGHT (a bunch of buttons) */}
        <div className={styles.item}>
            <aside className={styles.sidePanel}>
                {/* ROW 1: TIMER & SCORE (NOT FUNCTIONAL YET)*/}
                <div className={styles.buttonRow}>
                    <div className={styles.buttonGroup}>
                    <button 
                        className={styles.button}
                    >
                        03:00
                    </button>
                    <button 
                        className={styles.button}
                    >
                        15
                    </button>
                    </div>
                </div>
                
                {/* ROW 2: Action Buttons */}
                <div className={styles.buttonRow}>
                    <button className={styles.button}>
                        (Guess)
                    </button>
                </div>
                
                {/* ROW 3: Pieces Left */}
                <div className={styles.buttonRow}>
                    <h3 className={styles.rowTitle}>Pieces Left</h3>
                    <div className={styles.buttonGroup}>
                    <button className={styles.button}>
                        <img src={wK}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    <button className={styles.button}>
                        <img src={wQ}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    <button className={styles.button}>
                        <img src={wR}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    </div>
                </div>
                
                {/* ROW 4: Special Buttons */}
                <div className={styles.buttonRow}>
                    <div className={styles.buttonGroup}>
                    <button className={styles.button}>
                        <img src={wB}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    <button className={styles.button}>
                        <img src={wN}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    <button className={styles.button}>
                        <img src={wP}></img>
                    </button>
                    <button className={styles.button}>
                        1
                    </button>
                    </div>
                </div>

                {/* ROW 5: TOGGLE RESOLVED */}
                <div className={styles.buttonRow}>
                    <button className={styles.button}>
                        Toggle Resolved
                    </button>
                </div>
            </aside>
        </div>

      </main>
    </div>
  );
}