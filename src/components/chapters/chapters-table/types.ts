// TYPES
import { Chapter } from "@/db/schema";

export type ChapterFields = Pick<Chapter, 'id' | 'title' | 'slug' | 'isFree' | 'videoLength' | 'weight' | 'description'>;

export type ChaptersBriefProps = ChapterFields[] | null | undefined;