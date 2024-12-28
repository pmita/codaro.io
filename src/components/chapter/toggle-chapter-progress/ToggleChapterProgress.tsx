"use client"

import { useCallback } from "react";
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useToggleProgress } from "@/hooks/useToggleProgress/useToggleProgress";
import { showLoadingToast } from "@/lib/toasts";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import styles from './styles.module.css';
import { ToggleChapterProgressProps } from "./types";


export const ToggleChapterProgress = ({ chapterId, isFree = false }:ToggleChapterProgressProps) => {
  const { user } = useAuth();
  const { isCompleted } = useCheckProgress();
  const mutation = useToggleProgress();

  const handleClick = useCallback(() => {
    mutation.mutate({ chapterId, isCompleted: isCompleted(chapterId) });

    if(mutation.isIdle) {
      showLoadingToast('loading-toggle-progress');
    }
  }, [chapterId, isFree, mutation, isCompleted]);

  return (
    <div className={styles.container}>
      {isFree && user ? (
        <>
          <span className={styles.highlightedText}>Completed: </span>
          <button 
            className={cn("w-[20px] h-[20px] bg-primary rounded-[50%]", isCompleted(chapterId) ? "bg-primary" : "bg-secondary")}
            onClick={handleClick}
          />
        </>
      ) : (
        <div className={styles.locked} />
      )}
    </div>
  )
}