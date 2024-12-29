import { LockKeyhole } from 'lucide-react';
import styles from './styles.module.css';

export const ChapterStatusFallback = ({ isFree = false }: { isFree: boolean | undefined}) => {
  return (
    <>
      {isFree ? (
        <div className={styles.fallbackStatus}></div>
      ) : (
        <LockKeyhole width={20} height={20} color="#b72b1a" />
      )}
    </>
  )
}