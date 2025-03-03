import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  varchar,
  timestamp,
  jsonb
} from 'drizzle-orm/pg-core';
import { desc, relations } from 'drizzle-orm';

const timestamps = {
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow(),
}

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: text('email').notNull().unique(),
  tier: varchar('tier', { length: 20 }).default('free'),
  ...timestamps,
});

export const progress = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' }),
  completedChapters: jsonb("completed_chapters").default({}).notNull(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(), 
  title: text('title').notNull(),
  description: text('description').notNull(),
});

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .references(() => courses.id),
  slug: varchar('slug', { length: 100 }).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  isFree: boolean('is_free').default(false).notNull(),
  ...timestamps,
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  ...timestamps,
});

export const todo = pgTable('todo', {
  id: integer('id')
    .primaryKey(),
  text: text('text')
    .notNull(),
  done: boolean('done')
    .default(false)
    .notNull(),
})

export const customers = pgTable('customers', {
  id: serial('id')
    .primaryKey(),
  userId: integer('user_id')
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

// DB Relations
export const usersRelations = relations(users, ({ one }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.userId],
    relationName: "user_customer",
  }),
  progress: one(progress, {
    fields: [users.id],
    references: [progress.userId],
    relationName: 'user_progress',
  })
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  chapters: many(chapters),
}));

export const chaptersRelations = relations(chapters, ({ one }) => ({
  courses: one(courses, {
    fields: [chapters.courseId],
    references: [courses.id],
    relationName: 'chapter_course',
  }),
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



export type InserUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export type InsertTodo = typeof todo.$inferInsert;
export type SelectTodo = typeof todo.$inferSelect;