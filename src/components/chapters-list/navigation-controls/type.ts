import { StartOrEndEnum } from '@/types/courses';

export type NavigationControlsProps = {
  nextChapter: string | StartOrEndEnum;
  prevChapter: string | StartOrEndEnum;
}