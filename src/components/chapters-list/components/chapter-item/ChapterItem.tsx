import { AuthCheck } from "@/components/auth-check"
import { ChapterStatus } from "./components/chapter-status"
import { ChapterStatusFallback } from "./components/chapter-status-fallback"
import { Chapter } from "@/types/courses"
import styles from './styles.module.css';

export const ChapterItem = ({
  chapter
}: { chapter: Chapter }) => {
  if (!chapter) return null;

  return (
    <div className={styles.container}>
      <span className={styles.subContainer}>
        <AuthCheck 
          fallback={<ChapterStatusFallback isFree={chapter.free} />}
        >
          <ChapterStatus chapterId={chapter.slug} isFree={chapter.free} />
        </AuthCheck>
        <h3>{chapter.title}</h3>
      </span>
      {chapter?.video_length ? (
        <span 
          className={styles.length}
        >{chapter?.video_length}</span>
      ): null}
    </div>
  )
}