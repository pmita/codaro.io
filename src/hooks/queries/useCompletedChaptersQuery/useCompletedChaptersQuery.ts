// DATA
import { getProgressChapters } from '@/data/db/progress';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
// TYPES
import { CompletedChaptersQueryData } from './types';

export const useCompletedChaptersQuery = (courseSlug: string) => {
  const { user } = useAuth();
  return useQuery<CompletedChaptersQueryData>({
    queryKey: ['chapters-progress', user?.uid, courseSlug],
    queryFn: async () => (
      await getProgressChapters(courseSlug)
    ),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}