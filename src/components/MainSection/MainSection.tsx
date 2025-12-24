import { usePatients } from "@/hooks/usePatients";
import type { PatientFormData } from "@/models/form.interface";
import type { Patient } from "@/models/patients.interface";
import { useState } from "react";
import { PatientForm } from "../Form/Form";
import { Header } from "../Header/Header";
import { Modal } from "../Modal/Modal";
import { PatientsList } from "../PatientList/PatientList";
import { Spinner } from "../Spinner/Spinner";
import styles from "./main-section.module.css";

export const MainSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { patients, isLoading, isError, addPatient, updatePatient } =
    usePatients();

  const handleAdd = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPatient(null), 300);
  };

  const handleSavePatient = (formData: PatientFormData) => {
    if (selectedPatient) {
      updatePatient(selectedPatient.id, formData);
    } else {
      addPatient(formData);
    }
    handleCloseModal();
  };

  const handleEdit = (p: Patient) => {
    setSelectedPatient(p);
    setIsModalOpen(true);
  };
  return (
    <div style={{width: "100%"}}>
      <Header handleAdd={handleAdd} />
      <main className={styles.mainContainer}>
        {isLoading && <Spinner />}

        {isError && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              color: "red",
              marginTop: "20px",
            }}
          >
            <p>Error al cargar pacientes. Por favor intenta más tarde.</p>
          </div>
        )}

        {!isLoading && !isError && patients.length === 0 && (
          <p style={{ textAlign: "center", width: "100%", color: "#666" }}>
            No hay pacientes registrados.
          </p>
        )}

        {!isLoading && !isError && patients.length > 0 && (
          <PatientsList patients={patients} onEdit={handleEdit} />
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPatient ? "Editar Paciente" : "Agregar Paciente"}
      >
        <PatientForm
          defaultValues={selectedPatient}
          onSubmit={handleSavePatient}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
