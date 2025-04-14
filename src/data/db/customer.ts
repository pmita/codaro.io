"use server"

// DRIZZLE
import { db } from "@/db";
import { customers, users } from "@/db/schema";
import { eq } from "drizzle-orm";
// STRIPE
import Stripe from "stripe";
import { createNewStripeCustomer, retrieveExistingStripeCustomer } from "../stripe/customer";

export const getOrCreateStripeCustomer = async (userId: string, params?: Stripe.CustomerCreateParams) => {
  const existingStripeCustomer = await db
    .select({
      email: users.email,
      id: users.id,
      stripeCustomerId: customers.stripeCustomerId,
      subscriptionStatus: customers.subscriptionStatus,
      currentPeriodEnd: customers.currentPeriodEnd,
    })
    .from(customers)
    .innerJoin(users, eq(customers.userId, users.id))
    .where(eq(users.id, userId));

  const { stripeCustomerId, email, id } = existingStripeCustomer[0] ?? {};

  if (!stripeCustomerId) {
    const metadata = {
      firebaseUID: id,
    };
    const newlyCreatedCustomer = await createNewStripeCustomer(email, metadata);

    await addCustomerForFirstTime(id, newlyCreatedCustomer.id);
    return newlyCreatedCustomer;
  } else {
    return await retrieveExistingStripeCustomer(stripeCustomerId);
  }
}

export const addCustomerForFirstTime = async (userId: string, stripeCustomerId: string) => {
  await db.insert(customers).values({
    userId,
    stripeCustomerId,
  });
}