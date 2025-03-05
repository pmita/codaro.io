"use client"

import Link from 'next/link';
import { useChaptersQuery } from '@/hooks/queries/useChaptersQuery';
import styles from './styles.module.css';
import { Chapter } from '@/types/courses';
import { ChapterItem } from './components/chapter-item';

export const ChaptersList =  ({ course }: { course: string }) => {
  const { data: chapters } = useChaptersQuery(course);

  console.log(chapters, 'chapters');

  if (!chapters) return null;

  return (
    <>
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.id} className={styles.link}>
          <ChapterItem chapter={chapter} />
        </Link>
      ))}
    </>
  )
}