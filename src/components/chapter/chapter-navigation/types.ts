import { StartOrEndEnum } from '@/types/courses';

export type ChapterNavigationProps = {
  nextChapter: string | StartOrEndEnum;
  prevChapter: string | StartOrEndEnum;
}