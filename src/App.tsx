import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { PatientCard } from './components/PatientCard/PatientCard';
import type { Patient } from './models/parients.interface';
import { MOCK_PATIENTS } from './mocks/patients-mock';

function App() {
  const [patients] = useState<Patient[]>(MOCK_PATIENTS);

  const handleEdit = (p: Patient) => console.log('Edit', p);
  const handleAdd = () => console.log('Add New');

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
    </div>
  );
}

export default App;