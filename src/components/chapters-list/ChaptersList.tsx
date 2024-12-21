import Link from 'next/link';
import { AuthCheck } from '../auth-check';
import { Courses } from '@/types/courses';
import styles from './styles.module.css';

export const ChaptersList =  ({ chapters }: { chapters: Courses[] | undefined }) => {
  if (!chapters) return null;

  return (
    <>
      {chapters.map((chapter: any) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.weight} className={styles.link}>
        <div className={styles.container}>
          <span className={styles.subContainer}>
            <AuthCheck fallback={(
              <>
                {chapter.free ? (
                  <div className={styles.free}></div>
                ) : (
                  <div className={styles.locked}></div>
                )}
              </>
            
            )}>
              {chapter.free ? (
                  <div className={styles.free}></div>
                ) : (
                  <div className={styles.locked}></div>
              )}
            </AuthCheck>
            <h3>{chapter.title}</h3>
          </span>
          {chapter?.video_length && (
            <span 
              className={styles.length}
            >{chapter?.video_length}</span>
          )}
        </div>
      </Link>
      ))}
    </>
  )
}