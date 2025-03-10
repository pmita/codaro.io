import { ChapterItem } from "@/components/chapters-list/components/chapter-item";
import { getCurrentUser } from "@/data/auth/currentUser";
import { getCourseChapters } from "@/data/db/courses";
import { getUserProgress } from "@/data/db/progress";
import { getUser } from "@/data/user-2";
import { Link } from "lucide-react";
import styles from './styles.module.css';
import { ChapterStatus } from "@/components/chapters-list/components/chapter-item/components/chapter-status";
import { ChapterStatusFallback } from "@/components/chapters-list/components/chapter-item/components/chapter-status-fallback";


export default async function Chapters(courseSlug: string) {
  const currentUser = await getCurrentUser();
  let progress;

  if (currentUser) {
    progress = await getUserProgress();
  }
  const chapters = await getCourseChapters(courseSlug);

  return (
    <>
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.id} className="text-primary-error">
          <div className={styles.container}>
            <span className={styles.subContainer}>
              {currentUser ? (
                <ChapterStatus chapterId={chapter.slug} isFree={chapter.isFree} />
              ) : (
                <ChapterStatusFallback isFree={chapter.isFree} />
              )}
              <h3>{chapter.title}</h3>
            </span>
            {chapter?.videoLength ? (
              <span 
                className={styles.length}
              >{chapter?.videoLength}</span>
            ): null}
          </div>
        </Link>
      ))}
    </>
  );
}