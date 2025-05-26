// COMPONENTS
import { StatusIndicator } from "./components/status-indicator";
import { TimeStamp } from "./components/time-stamp";
// TYPES
import { ChapterPros } from "./types";
// STYLES
import styles from './styles.module.css';

export const Chapter = ({ 
  title, 
  videoLength, 
  completionStatus,
  canAccess,
}: ChapterPros) => {
  return (
    <div className={styles.container}>
      <span className={styles.subContainer}>
        <StatusIndicator canAccess={canAccess} status={completionStatus} />
        <h1>{title}</h1>
      </span>
      <TimeStamp 
        time={videoLength}
      />
    </div>
  )
}