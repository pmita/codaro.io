import { Course } from "@/db/schema";

export type CourseFields = Pick<Course, 'title' | 'description' | 'slug'>;