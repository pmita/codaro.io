import { Chapter } from "@/db/schema";

type ChapterDataType = Pick<Chapter, 'id' | 'title' | 'slug' | 'videoLength' | 'isFree'>;

export type AllChaptersProps = {
  course: string;
  allChapters: ChapterDataType[];
}