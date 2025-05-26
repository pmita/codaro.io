"use client"

// NEXT
import { useParams } from "next/navigation";
// REACT
import { useCallback } from "react";
// PACKAGES
import { Check, LockKeyhole } from "lucide-react";
// HOOKS
import { useToggleProgressMutation } from "@/hooks/mutations/useToggleProgressMutation";
import { useCompletedChapterQuery } from "@/hooks/queries/useCompletedChapterQuery";
import { useUserSubscriptionStatusQuery } from "@/hooks/queries/useUserSubscriptionStatusQuery";
// COMPONENTS
import { Button } from "@/components/ui/button";
// LIB
import { showLoadingToast } from "@/lib/toasts";
// UTILS
import { withAuth } from "@/utils/with-auth";
import { cn } from "@/lib/utils";
// STYLES
import styles from './styles.module.css';



export const Component = () => {
    // HOOKS
    const params = useParams();
    const courseSlug = params.slug as string;
    const chapterSlug = params.id as string;
    const { data: chapterDetails } = useCompletedChapterQuery(courseSlug, chapterSlug)
    const { data: subscriptionStatus } = useUserSubscriptionStatusQuery();
    const mutation = useToggleProgressMutation(courseSlug, chapterSlug);

  
    // EVENTS
    const handleClick = useCallback(() => {
      mutation.mutate({ courseSlug, chapterSlug });
  
      if(mutation.isIdle) {
        showLoadingToast('loading-toggle-progress');
      }
    }, [courseSlug, chapterSlug, mutation]);

    if (chapterDetails?.isFree || subscriptionStatus?.canAccess) {
      return (
        <Button 
          className={cn(
            styles.toggleButton, 
            chapterDetails?.isCompleted ? styles.completed : styles.uncompleted
          )}
          onClick={handleClick}
        >
          {chapterDetails?.isCompleted ? <Check width={20} height={20} color="#fff" /> : null}
        </Button>
      );
    }

    return null;
}

export const ToggleButton = withAuth(Component, <LockKeyhole width={38} height={36} color="#b72b1a" />);