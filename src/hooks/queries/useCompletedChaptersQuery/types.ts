export type CompletedChapters = {
  chapterId: number;
  isCompleted: boolean;
  isFree: boolean;
  chapterSlug: string;
}

export type CompletedChaptersQueryData = CompletedChapters[] | [] | undefined;