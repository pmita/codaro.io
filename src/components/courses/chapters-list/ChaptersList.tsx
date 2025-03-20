"use client"

// NEXT
import Link from 'next/link';
// REACT
import { useCallback } from 'react';
// HOOKS
import { useChaptersQuery } from '@/hooks/queries/useChaptersQuery';
import { useCompletedChaptersQuery } from '@/hooks/queries/useCompletedChaptersQuery';
import { useUserSubscriptionStatusQuery } from '@/hooks/queries/useUserSubscriptionStatusQuery';
// COMPONENTS
import { Chapter } from './components/chapter';
// TYPES
import { ChaptersListProps } from './types';
// STYLES
import styles from './styles.module.css';

export const ChaptersList =  ({ course, allChapters }: ChaptersListProps) => {
  // const { data: allChapters } = useChaptersQuery(course, initialData);
  const { data: completedChapters } = useCompletedChaptersQuery(course);
  const { data: userStatus } = useUserSubscriptionStatusQuery();

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
        <Link href={`/course-test/${course}/${chapter.slug}`} key={chapter.id} className={styles.link}>
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