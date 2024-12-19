import Link from 'next/link';
import { AuthCheck } from '../auth-check';
import styles from './styles.module.css';
import { getCourseChapters } from '@/data/courses';

interface IChapterList {
  params: Promise<{ slug: string, id: string }>;
}

export const ChaptersList = async ({ params}: IChapterList ) => {
  const chapters = await getCourseChapters(params);

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