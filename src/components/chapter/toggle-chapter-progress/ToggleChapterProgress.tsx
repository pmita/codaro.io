"use client"

import { useCallback } from "react";
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useToggleProgressMutation } from "@/hooks/useToggleProgressMutation";
import { showLoadingToast } from "@/lib/toasts";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import styles from './styles.module.css';
import { ToggleChapterProgressProps } from "./types";
import { LockKeyhole, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";


export const ToggleChapterProgress = ({ chapterId, isFree = false }:ToggleChapterProgressProps) => {
  const { user } = useAuth();
  const { isCompleted } = useCheckProgress();
  const mutation = useToggleProgressMutation();

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
          <Button 
            className={cn(
              styles.toggleButton, 
              isCompleted(chapterId) ? styles.completed : styles.uncompleted
            )}
            onClick={handleClick}
          >
            {isCompleted(chapterId) ? <Check width={20} height={20} color="#fff" /> : null}
          </Button>
          <span className={styles.highlightedText}>Completed</span>
        </>
      ) : (
        <>
          <LockKeyhole width={38} height={36} color="#b72b1a" />
          <span className={styles.highlightedText}>Locked</span>
        </>
      )}
    </div>
  )
}