import styles from "./App.module.css";
import { MainSection } from "./components/MainSection/MainSection";
function App() {
  return (
    <div className={styles.layout}>
      <MainSection/>
    </div>
  );
}

export default App;
