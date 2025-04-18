"use server"

// DRIZZLE
import { db } from "@/db";
import { Customer, customers, users } from "@/db/schema";
import { eq } from "drizzle-orm";
// STRIPE
import Stripe from "stripe";
// DATA
import { createNewStripeCustomer, retrieveExistingStripeCustomer } from "@/data/stripe/customer";
import { stripe } from "@/lib/stripe/server/config";

export const getOrCreateStripeCustomer = async (userId: string, params?: Stripe.CustomerCreateParams) => {
  try {

    const existingStripeCustomer = await db
      .select({
        email: users.email,
        stripeCustomerId: customers.stripeCustomerId,
        subscriptionStatus: customers.subscriptionStatus,
        currentPeriodEnd: customers.currentPeriodEnd,
      })
      .from(users)
      .leftJoin(customers, eq(users.id, customers.userId))
      .where(eq(users.id, userId));

    const { stripeCustomerId, email } = existingStripeCustomer[0] ?? {};

    if (!stripeCustomerId) {
      
      if (!email) {
        throw new Error("User email not found");
      }
      
      const metadata = { firebaseUID: userId };
      const newlyCreatedCustomer = await createNewStripeCustomer(email, metadata);

      await addCustomerForFirstTime(userId, newlyCreatedCustomer.id);
      return newlyCreatedCustomer;
    } else {
      return await retrieveExistingStripeCustomer(stripeCustomerId);
    }
  } catch (error) {
    throw new Error("Could not get or create Stripe customer");
  }
}

export const getExistingCustomer = async (customerId: string) => {
  try {
    const existingCustomer = await db
      .select({
        userId: users.id,
        id: customers.id,
      })
      .from(customers)
      .innerJoin(users, eq(customers.userId, users.id))
      .where(eq(customers.stripeCustomerId, customerId));

    if (existingCustomer.length === 0) {
      throw new Error("Customer not found");
    }

    const { userId, id } = existingCustomer[0] ?? {};

    return { 
      userId,
      id,
    }

  } catch(error) {
    throw new Error("Could not get existing customer");
  }
}

export const addCustomerForFirstTime = async (userId: string, stripeCustomerId: string) => {
  await db.insert(customers).values({
    userId: userId,
    stripeCustomerId: stripeCustomerId,
  });
}

export const updateCustomerTable = async (id: number, data: Customer) => {
  try {
    await db.update(customers).set(data).where(eq(customers.id, id));
  } catch (error) {
    throw new Error("Could not update customer table");
  }
}