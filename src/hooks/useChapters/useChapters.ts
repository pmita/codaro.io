import { useQuery } from '@tanstack/react-query';
import { getCourseChapters } from "@/data/content/courses";
import { Chapter } from "@/types/courses";

export const useChapters = (course: string) => {
  return useQuery<Chapter[] | undefined>({
    queryKey: ['chapters', course],
    queryFn: () => {
      return getCourseChapters(course);
    }
  });
}