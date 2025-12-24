import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {(title || !!onClose) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {!!onClose && (
              <button className={styles.closeButton} onClick={onClose}>
                &times;
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};