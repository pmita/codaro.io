import { useCallback } from "react";
import { useCompletedChapters } from "../useCompletedChapters"


export const useCheckProgress = () => {
  const { data: completedChapters } = useCompletedChapters();

  const isCompleted = useCallback((chapterId: string) => (
    Object.keys(completedChapters || {}).includes(chapterId || '')
  ), [completedChapters]);

  return { isCompleted };
}