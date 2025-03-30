// TYPES
import { Chapter } from "@/db/schema";

type ChapterFields = Pick<Chapter, 'id' | 'title' | 'slug' | 'isFree' | 'videoLength'>;

export type ChaptersBriefProps = ChapterFields[] | null | undefined;