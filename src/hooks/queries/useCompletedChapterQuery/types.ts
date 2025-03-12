export type CompletedChapter = {
  progressId: number,
  isCompleted: boolean,
  tier: string | null,
  isFree: boolean
}

export type CompletedChapterQueryData = CompletedChapter | null;