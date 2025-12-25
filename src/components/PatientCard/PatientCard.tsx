import { useState } from "react";
import type { Patient } from "@/models/patients.interface";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import styles from "./patient-card.module.css";

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
}

export const PatientCard = ({ patient, onEdit }: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const formattedDate = new Date(patient.createdAt).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const showToggle = patient.description.length > 100;

  return (
    <Card className={styles.container}>
      <div className={styles.cardHeader}>
        <img
          src={patient.avatar}
          alt={patient.name}
          className={styles.avatar}
          loading="lazy"
        />
        <Button
          variant="secondary"
          onClick={() => onEdit(patient)}
          style={{ padding: "0.25rem 0.75rem", fontSize: "0.8rem" }}
        >
          VER
        </Button>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.date}>{formattedDate}</span>
        <h3 className={styles.name}>{patient.name}</h3>

        <div
          className={`${styles.descriptionWrapper} ${
            isExpanded ? styles.expanded : ""
          }`}
        >
          <p className={styles.description}>{patient.description}</p>
        </div>

        {showToggle && (
          <p
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Ver menos" : "Ver más..."}
          </p>
        )}

        {patient.website && (
          <a href={patient.website} target="_blank" className={styles.website}>
            {patient.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
    </Card>
  );
};
