import { useCallback } from "react";
import { useCompletedChapters } from "../useCompletedChapters"


export const useCheckProgress = (course: string) => {
  const { data: completedChapters } = useCompletedChapters(course);

  const isCompleted = useCallback((chapterId: string) => (
    Object.keys(completedChapters || {}).includes(chapterId || '')
  ), [completedChapters]);

  return { isCompleted };
}