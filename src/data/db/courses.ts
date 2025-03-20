"use server"

// DRIZZLE
import { db } from "@/db"
import { courses, chapters } from "@/db/schema"
import { asc, eq, and } from "drizzle-orm";
import { describe } from "node:test";

export const getCourseChapters = async (courseSlug: string) => {
  const data = await db.select({
    id: chapters.id,
    title: chapters.title,
    slug: chapters.slug,
    videoLength: chapters.videoLength,
    isFree: chapters.isFree,
  })
  .from(chapters)
  .innerJoin(courses, eq(chapters.courseId, courses.id))
  .where(eq(courses.slug, courseSlug))
  .orderBy(asc(chapters.weight));

  return data.length ? data : [];
}

export const getCourseChapter = async (courseSlug: string, chapterSlug: string) => {
  const data = await db
    .select({
      id: chapters.id,
      title: chapters.title,
      slug: chapters.slug,
      previousChapterSlug: chapters.previousChapterSlug,
      nextChapterSlug: chapters.nextChapterSlug,
      isFree: chapters.isFree,
      courseId: courses.id,
      description: chapters.description,
      content: chapters.content,
      videoId: chapters.videoId,
    })
    .from(chapters)
    .innerJoin(courses, eq(chapters.courseId, courses.id))
    .where(
      and(
        eq(courses.slug, courseSlug),
        eq(chapters.slug, chapterSlug)
      )
    );

  return data.length ? data[0] : null;
}