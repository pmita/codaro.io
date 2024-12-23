import { useQuery } from '@tanstack/react-query';
import { getCompletedChapters } from '@/data/progress';

export const useCompletedChapters = (course: string) => {
  return useQuery<FirebaseFirestore.DocumentData | undefined>({
    queryKey: ['progression', course],
    queryFn: async () => {
      return await getCompletedChapters();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}