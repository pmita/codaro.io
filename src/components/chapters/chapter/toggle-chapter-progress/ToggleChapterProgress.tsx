// COMPONENTS
import { ToggleButton } from "./component/toggle-button";
// STYLES
import styles from './styles.module.css';


export const ToggleChapterProgress = () => (
  <div className={styles.container}>
    <ToggleButton />
    <span className={styles.highlightedText}>Completed</span>
  </div>
)