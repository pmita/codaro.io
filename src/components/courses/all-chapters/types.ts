import { Chapter } from '@/db/schema';

export type AllChaptersProps = {
  chapters: Pick<Chapter, 'id' | 'title' | 'slug' | 'videoLength' | 'isFree'>[];
  course: string;
}