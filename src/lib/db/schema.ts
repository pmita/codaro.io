import { relations } from 'drizzle-orm';
import { serial, pgTable, varchar, timestamp, text, integer, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  tier: varchar('tier', { length: 20 }).default('free'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id').unique(),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  invoiceStatus: varchar('invoice_status', { length: 20 }),
  stripeInvoiceId: text('stripe_invoice_id').unique(),
  amountPaid: integer('amount_paid'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// DB Relationships
export const usersRelations = relations(users, ({ one }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.userId],
    relationName: "user_customer",
  }),
}))

export const customersRelation = relations(customers, ({ many, one }) => ({
  invoices: many(invoices),
  user: one(users, {
    fields: [customers.userId],
    references: [users.id],
    relationName: 'customer_user',
  }),
}));

export const invoicesRelations = relations(invoices, ({ one}) => ({
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
    relationName: 'invoice_customer',
  })
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

