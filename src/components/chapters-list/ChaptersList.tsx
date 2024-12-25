"use client"

import Link from 'next/link';
import { useChapters } from '@/hooks/useChapters';
import styles from './styles.module.css';
import { Chapter } from '@/types/courses';
import { ChapterItem } from './components/chapter-item';

export const ChaptersList =  ({ course }: { course: string }) => {
  const { data: chapters } = useChapters(course);

  if (!chapters) return null;

  return (
    <>
      {chapters.map((chapter: Chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.weight} className={styles.link}>
          <ChapterItem chapter={chapter} />
        </Link>
      ))}
    </>
  )
}