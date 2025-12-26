import { useEffect } from "react";
import styles from "./notifications.module.css";
import { Button } from "../Button/Button";

export type NotificationType = "success" | "error";

interface ToastNotificationProps {
  message: string;
  type?: NotificationType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Notification = ({
  message,
  type = "success",
  isOpen,
  onClose,
  duration = 3500,
}: ToastNotificationProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>
        {type === "success" ? (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};
