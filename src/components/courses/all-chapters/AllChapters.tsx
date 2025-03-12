"use client"

// NEXT
import Link from 'next/link';
// REACT
import { useCallback } from 'react';
// HOOKS
import { useChaptersQuery } from '@/hooks/queries/useChaptersQuery';
import { useCompletedChaptersQuery } from '@/hooks/queries/useCompletedChaptersQuery';
// COMPONENTS
import { Chapter } from './components/chapter';
// TYPES
import { AllChaptersProps } from './types';
// STYLES
import styles from './styles.module.css';

export const AllChapters =  ({ course }: AllChaptersProps) => {
  const { data: allChapters } = useChaptersQuery(course);
  const { data: completedChapters } = useCompletedChaptersQuery(course);

  if (!allChapters || !allChapters.length) return null;

  // EVENTS
  const isCompleted = useCallback((chapterSlug: string) => {

    if (!completedChapters || !completedChapters.length) return false;

    const isChapterCompleted = completedChapters.find((chapter) => chapter.chapterSlug === chapterSlug);

    return isChapterCompleted ? true : false;
  }, [completedChapters, course]);


  return (
    <>
      {allChapters.map((chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.id} className={styles.link}>
          <Chapter 
            title={chapter.title}
            videoLength={chapter.videoLength}
            isFree={chapter.isFree}
            completionStatus={isCompleted(chapter.slug)}
          />
        </Link>
      ))}
    </>
  )
}