import { useCheckProgress } from "@/hooks/useCheckProgress";
import styles from './styles.module.css';
import { IChapterStatus } from "./types";

export const ChapterStatus = ({chapterId, isFree = false }: IChapterStatus) => {
  const { isCompleted } = useCheckProgress(chapterId);

  if (!chapterId) return null;

  if (!isFree) return <div className={styles.locked}></div>

  return (
    <>
      {isCompleted(chapterId) ? (
        <div className={styles.completed}></div>
      ) : (
        <div className={styles.uncompleted}></div>
      )}
    </>
  )
}