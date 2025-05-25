// DATA
import { getCourseChapters } from '@/data/db/actions';
// DRIZZLE
import { Chapter } from '@/data/db/schema';
// PACKAGES
import { useQuery } from '@tanstack/react-query';

type ChapterDataType = Pick<Chapter, 'id' | 'title' | 'slug' | 'videoLength' | 'isFree'>;

export const useChaptersQuery = (course: string, initialData: ChapterDataType[]) => {
  return useQuery<ChapterDataType[] | undefined>({
    queryKey: ['chapters', course],
    queryFn: async () => (
      await getCourseChapters(course)
    ),
    initialData,
  });
}