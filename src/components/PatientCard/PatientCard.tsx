
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import styles from './styles.module.css';
import type { Patient } from '../../models/parients.interface';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
}

export const PatientCard = ({ patient, onEdit }: PatientCardProps) => {
  const formattedDate = new Date(patient.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

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
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
        >
          VER
        </Button>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.date}>{formattedDate}</span>
        <h3 className={styles.name}>{patient.name}</h3>
        <p className={styles.description}>{patient.description}</p>
        
        {patient.website && (
          <a 
            href={patient.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.website}
          >
            {patient.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </Card>
  );
};