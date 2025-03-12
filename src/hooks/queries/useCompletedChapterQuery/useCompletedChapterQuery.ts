// DATA
import { getProgressChapter } from '@/data/db/progress';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
// TYPES
import { CompletedChapterQueryData } from './types';

export const useCompletedChapterQuery = (courseSlug: string, chapterSlug: string) => {
  const { user } = useAuth();
  return useQuery<CompletedChapterQueryData>({
    queryKey: ['chapter-progress', user?.uid, courseSlug, chapterSlug],
    queryFn: async () => (
      await getProgressChapter(courseSlug, chapterSlug)
    ),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}