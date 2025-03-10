// DATA
import { getUserProgress } from '@/data/db/progress';
// PACKAGES
import { useQuery } from '@tanstack/react-query';
// HOOKS
import { useAuth } from '@/hooks/useAuth';
// TYPES
import { CompletedChaptersQueryData } from './types';

export const useCompletedChaptersQuery = (courseSlug: string) => {
  const { user } = useAuth();
  return useQuery<CompletedChaptersQueryData>({
    queryKey: ['progress', user?.uid],
    queryFn: async () => (
      await getUserProgress(courseSlug)
    ),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}