import { useQuery } from '@tanstack/react-query';
import { Chapter } from '@/db/schema';
import { getCourseChapters } from '@/data/db/courses';

type ChapterDataType = Pick<Chapter, 'id' | 'title' | 'slug' | 'videoLength'>;

export const useChaptersQuery = (course: string) => {
  return useQuery<ChapterDataType[] | undefined>({
    queryKey: ['chapters', course],
    queryFn: async () => (
      await getCourseChapters(course)
    ),
  });
}