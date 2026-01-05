import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

interface NavBarProps {
  page: string; // maybe change to "random" | "leaderboard" | ..., etc
}

export default function NavBar( { page }: NavBarProps) {
    return(
        <>
        <nav className={styles.navBar}>
            <div className={styles.navBarContent}>
                {/* Chess Sweeper */}
                <div className={styles.navBarTitle}>
                    Chess Sweeper
                </div>

                {/* Page table */}
                <div className={styles.navBarPageIndex}>
                    <Link to="/daily" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={styles.navBarPage}>Daily</div>
                    </Link>
                    <Link to="/random" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={styles.navBarPage}>Random</div>
                    </Link>
                    <Link to="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={styles.navBarPage}>Leaderboard</div>
                    </Link>
                    <Link to="/rule" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={styles.navBarPage}>Rule</div>
                    </Link>
                </div>
            </div>
        </nav>
        <div className={styles.navBarPadding}></div>
        </>
    );
}
