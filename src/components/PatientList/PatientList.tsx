import React, { useMemo } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Patient } from "@/models/patients.interface";
import { PatientCard } from "../PatientCard/PatientCard";
import { Spinner } from "../Spinner/Spinner";
import styles from "./patient-list.module.css";

interface PatientsListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
}

export const PatientsList: React.FC<PatientsListProps> = ({
  patients,
  onEdit,
}) => {
  const { limit, lastElementRef } = useInfiniteScroll(patients.length, 9);

  const visiblePatients = useMemo(() => {
    return patients.slice(0, limit);
  }, [patients, limit]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {visiblePatients.map((patient, index) => {
          const isLastElement = index === visiblePatients.length - 1;

          return (
            <div
              key={patient.id}
              ref={isLastElement ? lastElementRef : null}
              className={styles.cardWrapper}
            >
              <PatientCard patient={patient} onEdit={onEdit} />
            </div>
          );
        })}
      </div>

      {limit < patients.length && (
        <div className={styles.status}>
          <Spinner />
        </div>
      )}

      {limit >= patients.length && patients.length > 0 && (
        <div className={styles.status}>No hay más pacientes para mostrar.</div>
      )}
    </div>
  );
};
