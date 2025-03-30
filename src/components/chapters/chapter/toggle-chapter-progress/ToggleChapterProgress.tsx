"use client"

// REACT
import { useCallback } from "react";
// PACKAGES
import { showLoadingToast } from "@/lib/toasts";
import { LockKeyhole, Check } from "lucide-react";
// HOOKS
import { useToggleProgressMutation } from "@/hooks/mutations/useToggleProgressMutation";
import { useCompletedChapterQuery } from "@/hooks/queries/useCompletedChapterQuery";
import { useIsSubscriptionValidQuery } from "@/hooks/queries/useIsSubscriptionValidQuery";
// COMPONENTS
import { Button } from "@/components/ui/button";
import { AuthCheck } from "@/components/pemrissions/auth-check";
// UTILS
import { cn } from "@/lib/utils";
// STYLES
import styles from './styles.module.css';
// TYPES
import { ToggleChapterProgressProps } from "./types";


export const ToggleChapterProgress = ({ chapterSlug, courseSlug }: ToggleChapterProgressProps) => {
  // HOOKS
  const { data: chapterDetails } = useCompletedChapterQuery(courseSlug, chapterSlug)
  const { data: canAccess } = useIsSubscriptionValidQuery();
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
      <AuthCheck fallback={(<LockKeyhole width={38} height={36} color="#b72b1a" />)}>
        {(chapterDetails?.isFree || canAccess) 
          ? (
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
            </>
            ) 
            : null
          }
      </AuthCheck>
      <span className={styles.highlightedText}>Completed</span>
    </div>
  )
}