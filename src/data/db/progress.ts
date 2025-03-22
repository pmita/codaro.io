"use server"

// DRIZZLE
import { db } from "@/db"
import { chapters, users, courses, progress } from "@/db/schema"
import { and, eq, not } from "drizzle-orm";
// DATA
import { getCurrentUser } from "@/data/auth/currentUser";

export const getProgressChapters = async (courseSlug: string) => {
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
    .innerJoin(users, eq(progress.userId, users.id))
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

export const getProgressChapter = async (courseSlug: string, chapterSlug: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("No user found");
  }

  const data = await db
    .select({
      progressId: progress.id,
      isCompleted: progress.isCompleted,
      tier: users.tier,
      isFree: chapters.isFree
    })
    .from(progress)
    .innerJoin(users, eq(progress.userId, users.id))
    .innerJoin(chapters, eq(progress.chapterId, chapters.id))
    .innerJoin(courses, eq(chapters.courseId, courses.id))
    .where(
      and(
        eq(progress.userId, currentUser.uid),
        eq(courses.slug, courseSlug),
        eq(chapters.slug, chapterSlug)
      )
    )
    .limit(1); // Ensures we get only one result

  return data.length ? data[0] : null; // Return the single progress item or null if not found
};

export const toggleUserProgress = async (courseSlug: string, chapterSlug: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }

  try {
    const { progressId, chapterId } = await getChapterDetails(courseSlug, chapterSlug, currentUser.uid);
  
    if (!progressId) {
      await addChapterForTheFirstTime(chapterId, currentUser.uid);
    } else {
      await updateExistingChapterInProgress(chapterId, currentUser.uid);
    }
  } catch(error) {
    console.error(error);
    throw new Error('Something went wrong with db');
  }
}

export const getChapterDetails = async (courseSlug: string, chapterSlug: string, userId: string) => {
  const matchingData =  await db
    .select({
      progressId: progress.id,
      chapterId: chapters.id,
    })
    .from(chapters)
    .innerJoin(courses, eq(chapters.courseId, courses.id))
    .leftJoin(progress, and(
      eq(progress.userId, userId),
      eq(progress.chapterId, chapters.id)
    ))
    .where(
      and(
        eq(chapters.slug, chapterSlug),
        eq(courses.slug, courseSlug)
      )
    )
    .limit(1);

    if (!matchingData.length) { 
      throw new Error('No matching data found');
    }
    
    const { progressId, chapterId } = matchingData[0];
    
    if (!chapterId) { 
      throw new Error('No chapter found');
    }

    return { progressId, chapterId };
}

export const addChapterForTheFirstTime = async (chapterId: number, userId: string) => {
  await db
    .insert(progress)
    .values({
      userId: userId,
      chapterId,
      isCompleted: true,
    });
}

export const updateExistingChapterInProgress = async (chapterId: number, userId: string) => {
  await db
    .update(progress)
    .set({
      isCompleted: not(progress.isCompleted),
    })
    .where(
      and(
        eq(progress.userId, userId),
        eq(progress.chapterId, chapterId
      )
    )
  );
}


