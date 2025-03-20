// COMPONENTS
import { AuthCheck } from "@/components/pemrissions/auth-check"
import { StatusIndicator } from "./components/status-indicator";
import { TimeStamp } from "./components/time-stamp";
// PACKAGES
import { LockKeyhole } from "lucide-react";
// UTILS
import { cn } from "@/lib/utils";
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
        <AuthCheck fallback={(<LockKeyhole width={20} height={20} color="#b72b1a" />)}>
          {canAccess 
            ? <StatusIndicator status={completionStatus} /> 
            : <LockKeyhole width={20} height={20} color="#b72b1a" />
          }
          <h1>{title}</h1>
        </AuthCheck>
      </span>
      <TimeStamp 
        time={videoLength}
      />
    </div>
  )
}