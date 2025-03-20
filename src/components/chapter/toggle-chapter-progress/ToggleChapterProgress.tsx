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
import { useIsSubscriptionValidQuery } from "@/hooks/queries/useIsSubscriptionValidQuery";
import { AuthCheck } from "@/components/pemrissions/auth-check";


export const ToggleChapterProgress = ({ chapterSlug, courseSlug }: ToggleChapterProgressProps) => {
  // HOOKS
  const { data: chapterDetails } = useCompletedChapterQuery(courseSlug, chapterSlug)
  const { data: canAccess } = useIsSubscriptionValidQuery();
  const mutation = useToggleProgressMutation(courseSlug, chapterSlug)

  // EVENTS
  const handleClick = useCallback(() => {
    console.log('courseSlug', courseSlug);
    console.log('chapterSlug', chapterSlug);
    mutation.mutate({ courseSlug, chapterSlug });

    if(mutation.isIdle) {
      showLoadingToast('loading-toggle-progress');
    }
  }, [courseSlug, chapterSlug, mutation]);

  return (
    <div className={styles.container}>
      <AuthCheck fallback={(<LockKeyhole width={20} height={20} color="#b72b1a" />)}>
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
              <span className={styles.highlightedText}>Completed</span>
            </>
            ) 
          : null
        }
      </AuthCheck>
    </div>
  )
}