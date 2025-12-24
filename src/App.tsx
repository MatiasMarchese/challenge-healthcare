import { useState } from "react";
import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import { PatientForm } from "./components/Form/Form";
import { usePatients } from "./hooks/usePatients";
import type { Patient } from "./models/parients.interface";
import type { PatientFormData } from "./models/form.interface";
import { Spinner } from "./components/Spinner/Spinner";
import { PatientsList } from "./components/PatientList/patient-list";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { patients, isLoading, isError, addPatient, updatePatient } =
    usePatients();

  const handleEdit = (p: Patient) => {
    setSelectedPatient(p);
    setIsModalOpen(true);
  };

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

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoCircle}></div>
          <h1>Pacientes</h1>
        </div>

        <Button onClick={handleAdd}>AGREGAR PACIENTE</Button>
      </header>

      <main className={styles.gridContainer}>
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
}

export default App;
