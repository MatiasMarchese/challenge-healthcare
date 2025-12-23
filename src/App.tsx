import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { PatientCard } from './components/PatientCard/PatientCard';
import type { Patient } from './models/parients.interface';
import { MOCK_PATIENTS } from './mocks/patients-mock';
import { Modal } from './components/Modal/Modal';

function App() {
  const [patients] = useState<Patient[]>(MOCK_PATIENTS);

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
        {patients.map(patient => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={handleEdit}
          />
        ))}
      </main>

      <Modal
        isOpen={isModalOpen}
        title={selectedPatient ? "Editar Paciente" : "Agregar Paciente"}
        onClose={handleCloseModal}
      >
        <div style={{ padding: '20px' }}>
          <p>
            {selectedPatient
              ? `Editando a: ${selectedPatient.name}`
              : "Formulario para crear nuevo paciente"}
          </p>
        </div>

        <div style={{ padding: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button onClick={handleCloseModal} variant="secondary">Cancelar</Button>
          <Button onClick={() => console.log('Guardar')}>Guardar</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;