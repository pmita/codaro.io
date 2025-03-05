import { db } from "@/db"
import { NewChapter, NewProgress, progress } from "@/db/schema"
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "../auth/currentUser";


export async function markChapterCompleted(userId: number, chapterSlug: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }

  await db.execute(sql`
    UPDATE progress
    SET completed_chapters = jsonb_set(completed_chapters, '{${chapterSlug}}', 'true', true)
    WHERE user_id = ${userId}
  `);
}

export const markChapterUnCompleted = async (userId: number, chapterSlug: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }
  await db.execute(sql`
    UPDATE progress
    SET completed_chapters = completed_chapters - ${chapterSlug}
    WHERE user_id = ${userId}
  `);
}

export const getUserProgress = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }

  const data = await db
    .select({
      completedChapters: progress.completedChapters
    })
    .from(progress)
    .where(eq(progress.userId, currentUser.uid));

  return data?.length ? data[0].completedChapters : {};
}
