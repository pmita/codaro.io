"use client"

// REACT
import { useCallback } from "react";
// PACKAGES
import { showLoadingToast } from "@/lib/toasts";
import { LockKeyhole, Check } from "lucide-react";
// HOOKS
import { useAuth } from "@/hooks/useAuth";
import { useToggleProgressMutation } from "@/hooks/mutations/useToggleProgressMutation";
import { useCompletedChapterQuery } from "@/hooks/queries/useCompletedChapterQuery";
// COMPONENTS
import { Button } from "@/components/ui/button";
// UTILS
import { cn } from "@/lib/utils";
// STYLES
import styles from './styles.module.css';
// TYPES
import { ToggleChapterProgressProps } from "./types";


export const ToggleChapterProgress = ({ chapterSlug, courseSlug }: ToggleChapterProgressProps) => {
  // HOOKS
  const { user } = useAuth();
  const { data: chapterDetails } = useCompletedChapterQuery(courseSlug, chapterSlug)
  const mutation = useToggleProgressMutation(courseSlug, chapterSlug)

  // EVENTS
  const handleClick = useCallback(() => {
    mutation.mutate({ courseSlug, chapterSlug });

    if(mutation.isIdle) {
      showLoadingToast('loading-toggle-progress');
    }
  }, [courseSlug, chapterSlug, mutation]);

  return (
    <div className={styles.container}>
      {(chapterDetails?.isFree || chapterDetails?.tier === 'PRO') && user ? (
        <>
          <Button 
            className={cn(
              styles.toggleButton, 
              chapterDetails?.isCompleted ? styles.completed : styles.uncompleted
            )}
            onClick={handleClick}
          >
            {chapterDetails?.isCompleted ? <Check width={20} height={20} color="#fff" /> : null}
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