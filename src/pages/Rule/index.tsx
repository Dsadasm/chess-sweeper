import React, { useState } from 'react';
import styles from './index.module.css';

export default function RuleScreen() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([0, 1])
  );
  const [activeSection, setActiveSection] = useState<number>(0);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
    setActiveSection(index);
  };

  const expandAll = () => {
    const allIndices = ruleSections.map((_, index) => index);
    setExpandedSections(new Set(allIndices));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  return (
    <div className={styles.container}>
      {/* TOP HEADER NAVIGATION */}
      <header className={styles.topHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <h1>Chess Sweeper Rules</h1>
            <p>Complete guide to gameplay and strategies</p>
          </div>
          
          <div className={styles.headerControls}>
            <button onClick={expandAll} className={styles.headerButton}>
              Expand All
            </button>
            <button onClick={collapseAll} className={styles.headerButton}>
              Collapse All
            </button>
          </div>
        </div>

        {/* TABLE OF CONTENTS NAVBAR */}
        <nav className={styles.topNav}>
          <div className={styles.navContainer}>
            <div className={styles.navLabel}>Jump to section:</div>
            <div className={styles.navLinks}>
              {ruleSections.map((section, index) => (
                <button
                  key={index}
                  className={`${styles.navLink} ${
                    activeSection === index ? styles.activeNavLink : ''
                  }`}
                  onClick={() => scrollToSection(index)}
                >
                  {index + 1}. {section.title.split(' ').slice(0, 3).join(' ')}
                  {section.title.split(' ').length > 3 ? '...' : ''}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT BELOW HEADER */}
      <main className={styles.mainContent}>
        {ruleSections.map((section, index) => (
          <section
            key={index}
            id={`section-${index}`}
            className={`${styles.ruleSection} ${
              expandedSections.has(index) ? styles.expanded : ''
            }`}
          >
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleSection(index);
                }
              }}
            >
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionBadge}>{index + 1}</span>
                <h2>{section.title}</h2>
              </div>
              <span className={styles.expandIcon}>
                {expandedSections.has(index) ? '−' : '+'}
              </span>
            </div>

            {expandedSections.has(index) && (
              <div className={styles.sectionContent}>
                {section.content}
                
                {section.example && (
                  <div className={styles.example}>
                    <h4>📘 Example</h4>
                    {section.example}
                  </div>
                )}
                
                {section.note && (
                  <div className={styles.note}>
                    <strong>💡 Note: </strong>
                    {section.note}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* BACK TO TOP FIXED BUTTON */}
      <button
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Back to Top
      </button>
    </div>
  );
}

// ============================================================================
// MAIN CONTENT i.e. CHANGE HERE IF NEED CHANGE RULES
// ============================================================================

interface RuleSection {
  title: string;
  content: React.ReactNode;
  example?: React.ReactNode;
  note?: string;
}

const ruleSections: RuleSection[] = [
  {
    title: "Game Objective",
    content: (
      <>
        <p>
          <strong>ChessSweeper</strong> combines two classic games: Chess and Minesweeper.
          In Minesweeper, the goal is to identify the location of all mines. Similarly, in <strong>ChessSweeper</strong>, the goal is to identify the
          location of all chess pieces, while scoring as much as possible.
        </p>
      </>
    ),
  },
  
  {
    title: "Tiles - Empty, Numbered, Piece",
    content: (
      <>
        <p>A tile can either be empty, numbered or be occupied by a piece.</p>
        <p>An empty tile indicates that no pieces can attack this tile.</p>
        <p>A numbered tile n indicates that n pieces are attacking this tile.</p>
        <p>If a piece exists on the tile, it will always show the piece instead.</p>
        <p>(Put images of each type of tile below.)</p>
        <p>Tip: If you Toggle Resolved, empty and numbered tiles will only count the attack patterns of hidden pieces.</p>
      </>
    ),
  },
  
  {
    title: "Attack Patterns",
    content: (
      <>
        <p>(I think it will be better if we show images here.)</p>
      </>
    )
  },
  
  {
    title: "Actions and Scoring",
    content: (
      <>
        <p>The player has 2 actions: Revealing and Guessing.</p>
        <p>Click on an unrevealed tile to reveal it. Adjacent empty tiles are also revealed similar to <strong>Minesweeper</strong>.</p>
        <p>Revealing costs 1 point. Additionally, if the tile the player clicks on has a piece, 5 points are deducted.</p>

        <p>If the player is confident that they know where a piece is, they can try to guess it:</p>
        <p>1. Click on the guess icon (magnifying glass) to toggle Guess</p>
        <p>2. Click on the piece icon and an unrevealed tile</p>
        <p>(Maybe have a gif here)</p>
        <p>A correct guess reveals the piece, and grants the player 3 points, while an incorrect guess costs 3 points instead.</p>
      </>
    )
  },

  {
    title: "Game Over",
    content: (
      <>
        <p>If the player reveals all pieces, they win.</p>
        <p>If the player reaches 0 points, they lose.</p>
      </>
    )
  }
];
