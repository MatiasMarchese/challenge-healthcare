import { Button } from "../Button/Button";
import styles from "./header.module.css";

interface HeaderProps {
  handleAdd: () => void;
}

export const Header = ({ handleAdd }: HeaderProps) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoCircle}></div>
          <h1>Pacientes</h1>
        </div>
        <Button onClick={handleAdd}>AGREGAR PACIENTE</Button>
      </header>
    </>
  );
};