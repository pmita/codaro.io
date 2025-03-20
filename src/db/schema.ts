import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const timestamps = {
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow(),
}

export const users = pgTable('users', {
  id: varchar('id', { length: 128 }).primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: text('email').notNull().unique(),
  tier: varchar('tier', { length: 20 }).default('free'),
  ...timestamps,
});

export const progress = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 128 })
    .references(() => users.id, { onDelete: 'cascade' }),
  chapterId: integer('chapter_id')
    .references(() => chapters.id, { onDelete: 'cascade' })
    .notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  ...timestamps,
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(), 
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
});

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 100 }).notNull(),
  previousChapterSlug: varchar('previous_chapter_slug', { length: 100 }),
  nextChapterSlug: varchar('next_chapter_slug', { length: 100 }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  weight: integer('weight').notNull().unique(),
  videoId: varchar('video_id', { length: 100 }),
  videoLength: integer('video_length'),
  isFree: boolean('is_free').default(false).notNull(),
  ...timestamps,
});

export const customers = pgTable('customers', {
  id: serial('id')
    .primaryKey(),
  userId: varchar('user_id', { length : 128 })
    .references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id')
    .unique(),
  stripeSubscriptionId: text('stripe_subscription_id')
    .unique(),
  stripeProductId: text('stripe_product_id')
    .unique(),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
  currentPeriodStart: timestamp('current_period_start')
    .notNull(),
  currentPeriodEnd: timestamp('current_period_end')
    .notNull(),
});

export const invoices = pgTable('invoices', {
  id: serial('id')
    .primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id, { onDelete: 'cascade' }),
  invoiceStatus: varchar('invoice_status', { length: 20 }),
  stripeInvoiceId: text('stripe_invoice_id')
    .unique(),
  amountPaid: integer('amount_paid'),
  ...timestamps,
});

// Relations
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

// User related types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Progress = typeof progress.$inferSelect;
export type NewProgress = typeof progress.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

// Course related types
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Chapter = typeof chapters.$inferSelect;
export type NewChapter = typeof chapters.$inferInsert;