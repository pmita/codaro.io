import { Course } from "@/data/db/schema";

export type CourseFields = Pick<Course, 'title' | 'description' | 'slug'>;