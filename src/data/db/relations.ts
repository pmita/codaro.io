// DRIZZLE
import { relations } from "drizzle-orm";
import { users, customers, progress, courses, chapters, invoices } from "./schema";

export const usersRelations = relations(users, ({ one, many }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.userId],
    relationName: "user_customer",
  }),
  progress: many(progress),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
    relationName: 'progress_user',
  }),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  chapters: many(chapters),
}));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  courses: one(courses, {
    fields: [chapters.courseId],
    references: [courses.id],
    relationName: 'chapter_course',
  }),
  progress: many(progress),
}));

export const customersRelation = relations(customers, ({ many, one }) => ({
  invoices: many(invoices),
  user: one(users, {
    fields: [customers.userId],
    references: [users.id],
    relationName: 'customer_user',
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
    relationName: 'invoice_customer',
  })
}));