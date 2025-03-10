"use server"

// DRIZZLE
import { db } from "@/db"
import { chapters, users, courses, progress } from "@/db/schema"
import { and, eq } from "drizzle-orm";
// DATA
import { getCurrentUser } from "@/data/auth/currentUser";

export const getUserProgress = async (courseSlug: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }

  const data = await db
    .select({
      chapterId: progress.chapterId,
      isCompleted: progress.isCompleted,
      isFree: chapters.isFree,
      chapterSlug: chapters.slug
    })
    .from(progress)
    .innerJoin(users, eq(progress.userId, currentUser.uid))
    .innerJoin(chapters, eq(progress.chapterId, chapters.id))
    .innerJoin(courses, eq(chapters.courseId, courses.id))
    .where(
      and(
        eq(progress.userId, currentUser.uid),
        eq(courses.slug, courseSlug),
        eq(progress.isCompleted, true)
      )
    )

    return data.length ? data : [];
} 
