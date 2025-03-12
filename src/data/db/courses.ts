"use server"

// DRIZZLE
import { db } from "@/db"
import { courses, chapters } from "@/db/schema"
import { asc, eq, and } from "drizzle-orm";

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
      isFree: chapters.isFree,
      courseId: courses.id,
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