import React from 'react';
import styles from './styles.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      className={`${styles.card} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};