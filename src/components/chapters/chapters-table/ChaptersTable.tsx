"use client"
// NEXT
import Link from 'next/link';
// COMPONENTS
import { ChapterBrief } from './components/chapter-brief';
// STYLES
import styles from './styles.module.css';
// TYPES
import { ChaptersBriefProps } from './types';
import { useParams } from 'next/navigation';


export const ChaptersTable = ({ chapters }: { chapters: ChaptersBriefProps }) => {
  const { slug: chapterSlug } = useParams();
  
  if (!chapters) {
    return null
  }

  return (
    <section className={styles.container}>
      {chapters.map((chapter) => (
        <Link href ={`/course-test/${chapterSlug}/${chapter.slug}`} key={chapter.id}>
          <ChapterBrief
            title={chapter.title}
            description={chapter.description || ''}
            weight={chapter?.weight}
          />
        </Link>
      ))}
    </section>
  );
}