"use client"

// NEXT
import Link from 'next/link';
// REACT
import { useCallback } from 'react';
// HOOKS
import { useCompletedChaptersQuery } from '@/hooks/queries/useCompletedChaptersQuery';
// COMPONENTS
import { Chapter } from './components/chapter';
// TYPES
import { AllChaptersProps } from './types';
// STYLES
import styles from './styles.module.css';

export const AllChapters =  ({ chapters, course }: AllChaptersProps) => {
  const { data: completedChapters } = useCompletedChaptersQuery(course);

  // EVENTS
  const isCompleted = useCallback((chapterId: number) => {

    if (!completedChapters || !completedChapters.length) return false;

    const isChapterCompleted = completedChapters.find((chapter) => chapter.chapterId === chapterId);

    return isChapterCompleted ? true : false;
  }, []);

  console.log('completedChapters', completedChapters)

  return (
    <>
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.id} className={styles.link}>
          <Chapter 
            title={chapter.title}
            videoLength={chapter.videoLength}
            isFree={chapter.isFree}
            completionStatus={isCompleted(chapter.id)}
          />
        </Link>
      ))}
    </>
  )
}