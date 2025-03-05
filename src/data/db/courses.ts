"use server"

import { db } from "@/db"
import { courses, chapters } from "@/db/schema"
import { asc, eq } from "drizzle-orm";

export const getCourseChapters = async (chapterSlug: string) => {
  const data = await db.select({
    id: chapters.id,
    title: chapters.title,
    slug: chapters.slug,
    videoLength: chapters.videoLength,
  })
  .from(chapters)
  .innerJoin(courses, eq(chapters.courseId, courses.id))
  .where(eq(courses.slug, chapterSlug))
  .orderBy(asc(chapters.weight));

  return data.length ? data : [];
}