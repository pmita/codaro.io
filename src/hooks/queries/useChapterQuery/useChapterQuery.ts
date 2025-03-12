import { useQuery } from '@tanstack/react-query';
import { Chapter } from '@/db/schema';
import { getCourseChapter } from '@/data/db/courses';

type ChapterDataType = Pick<Chapter, 'id' | 'title' | 'slug' | 'isFree' | 'courseId'>;

export const useChaptersQuery = (courseSlug: string, chapterSlug: string) => {
  return useQuery<ChapterDataType | null | undefined>({
    queryKey: ['chapter', courseSlug, chapterSlug],
    queryFn: async () => (
      await getCourseChapter(courseSlug, chapterSlug)
    ),
  });
}