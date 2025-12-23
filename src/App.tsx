import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { PatientCard } from './components/PatientCard/PatientCard';
import { Modal } from './components/Modal/Modal';
import type { Patient } from './models/parients.interface';
import { MOCK_PATIENTS } from './mocks/patients-mock';
import { PatientForm } from './components/Form/Form';
import type { PatientFormData } from './models/form.interface';

function App() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newPatient: Patient = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...formData,
      };
      setPatients((prev) => [...prev, newPatient]);
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

        <Button onClick={handleAdd}>
          AGREGAR PACIENTE
        </Button>
      </header>

      <main className={styles.gridContainer}>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={handleEdit}
          />
        ))}
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