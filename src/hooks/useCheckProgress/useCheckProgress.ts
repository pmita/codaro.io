import { useCallback } from "react";
import { useCompletedChaptersQuery } from "../useCompletedChaptersQuery"


export const useCheckProgress = () => {
  const { data: completedChapters } = useCompletedChaptersQuery();

  const isCompleted = useCallback((chapterId: string) => (
    Object.keys(completedChapters || {}).includes(chapterId || '')
  ), [completedChapters]);

  return { isCompleted };
}