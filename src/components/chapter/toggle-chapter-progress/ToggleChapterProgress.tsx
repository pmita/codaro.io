"use client"

import { useCallback } from "react";
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useToggleProgressMutation } from "@/hooks/mutations/useToggleProgressMutation";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
import { useAuth } from "@/hooks/useAuth";
import { showLoadingToast } from "@/lib/toasts";
import { LockKeyhole, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ToggleChapterProgressProps } from "./types";
import styles from './styles.module.css';


export const ToggleChapterProgress = ({ chapterId, isFree = false }:ToggleChapterProgressProps) => {
  const { user } = useAuth();
  const { isCompleted } = useCheckProgress();
  const mutation = useToggleProgressMutation();

  const canAccess = useIsSubscriptionValid();

  const handleClick = useCallback(() => {
    mutation.mutate({ chapterId, isCompleted: isCompleted(chapterId) });

    if(mutation.isIdle) {
      showLoadingToast('loading-toggle-progress');
    }
  }, [chapterId, isFree, mutation, isCompleted]);

  return (
    <div className={styles.container}>
      {(isFree || canAccess) && user ? (
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