import React, { useEffect } from "react";
import styles from "./GamePopup.module.css";

interface GamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
}

export default function GamePopup({ 
  isOpen, 
  onClose, 
  title,
  text
}: GamePopupProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("active-popup");
    } else {
      document.body.classList.remove("active-popup");
    }
    
    return () => {
      document.body.classList.remove("active-popup");
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.popupcontent}>
            <h2>{title}</h2>
            <p>{text}</p>
            <button className={styles.closepopup} onClick={onClose}>
                X
            </button>
        </div>
      </div>
    </>
  );
}