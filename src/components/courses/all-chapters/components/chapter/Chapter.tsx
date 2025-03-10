// COMPONENTS
import { AuthCheck } from "@/components/pemrissions/auth-check"
import { StatusFallback } from "./components/status-fallback";
// UTILS
import { cn } from "@/lib/utils";
// TYPES
import { ChapterPros } from "./types";
// STYLES
import styles from './styles.module.css';

export const Chapter = ({ title, videoLength, isFree, completionStatus }: ChapterPros) => {

  console.log('completionStatus', completionStatus)
  return (
    <div className={styles.container}>
      <span className={styles.subContainer}>
        <AuthCheck 
          fallback={<StatusFallback isFree={isFree} />}
        >
          <div 
            className={cn(
              styles.status, 
              completionStatus ? styles.completed : styles.uncompleted
            )} 
          />
        </AuthCheck>
        <h3>{title}</h3>
      </span>
      {videoLength ? (
        <span 
          className={styles.length}
        >{videoLength}</span>
      ): null}
    </div>
  )
}