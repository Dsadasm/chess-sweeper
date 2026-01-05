import React from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  page: string; // maybe change to "random" | "leaderboard" | ..., etc
}

export default function NavBar( { page }: NavBarProps) {
    return(
        <nav className={styles.navBar}>
            <div className={styles.navBarContent}>
                {/* Chess Sweeper */}
                <div className={styles.navBarTitle}>
                    Chess Sweeper
                </div>

                {/* Page table */}
                <div className={styles.navBarPageIndex}>
                    <div>Daily</div>
                    <div>Random</div>
                    <div>Leaderboard</div>
                </div>
            </div>
        </nav>
    );
}
