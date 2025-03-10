"use client"

import { LockKeyhole } from "lucide-react";
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { cn } from "@/lib/utils";
import { IChapterStatus } from "./types";
import styles from './styles.module.css';
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";

export const ChapterStatus = ({chapterId, isFree = false }: IChapterStatus) => {
  const { isCompleted } = useCheckProgress();
  const { data: user } = useUserQuery();
  
  if (!chapterId || !user) return null;
  
  const canAccess = useIsSubscriptionValid();

  if (!canAccess && !isFree) return <LockKeyhole width={20} height={20} color="#b72b1a" />

  return (
    <div 
      className={cn(
        styles.status, 
        isCompleted(chapterId) ? styles.completed : styles.uncompleted
      )} 
    />
  )
}