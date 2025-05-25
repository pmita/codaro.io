import { Chapter } from "@/data/db/schema";

type ChapterDataType = Pick<Chapter, 'id' | 'title' | 'slug' | 'videoLength' | 'isFree'>;

export type ChaptersListProps = {
  course: string;
  allChapters: ChapterDataType[];
}