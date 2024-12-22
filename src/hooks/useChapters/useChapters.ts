import { useQuery } from '@tanstack/react-query';
import { getCourseChapters } from "@/data/courses";
import { Courses } from "@/types/courses";

export const useChapters = (course: string) => {
  return useQuery<Courses[] | undefined>({
    queryKey: ['chapters', course],
    queryFn: () => {
      return getCourseChapters(course);
    }
  });
}