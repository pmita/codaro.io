"use server"

// DATA
import { createNewStripeCustomer, retrieveExistingStripeCustomer } from "@/data/stripe";
// DRIZZLE
import { db } from "@/db";
import { customers, NewCustomer, users } from "@/db/schema";
import { eq } from "drizzle-orm";
// STRIPE
import { stripe } from "@/lib/stripe/server/config";
import Stripe from "stripe";
// TYPES
import { StripeWebhookSubscirptionEvents } from "@/types/stripe";

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

export const getExistingCustomer = async (stripeCustomerId: string) => {
  try {
    const existingCustomer = await db
      .select({
        userId: users.id,
        id: customers.id,
        customerId: customers.id,
      })
      .from(customers)
      .innerJoin(users, eq(customers.userId, users.id))
      .where(eq(customers.stripeCustomerId, stripeCustomerId));

    if (existingCustomer.length === 0) {
      throw new Error("Customer not found");
    }

    const { userId, id, customerId } = existingCustomer[0] ?? {};

    return { 
      userId,
      id,
      customerId
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

export const manageSubscriptionPurchase = async (
  subscriptionId: string,
  customerId: string,
  eventType: StripeWebhookSubscirptionEvents
) => {
  try {
    const { userId } = await getExistingCustomer(customerId);

    if (!userId) {
      throw new Error("User not found");
    }
  
    const subscriptionDetails = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method'],
    });

    const baseOptions = {
      stripeSubscriptionId: subscriptionDetails.items.data[0].id,
      planName: subscriptionDetails.items.data[0].plan.nickname,
      stripeProductId: typeof subscriptionDetails.items.data[0].price.product === 'string'
        ? subscriptionDetails.items.data[0].price.product
        : subscriptionDetails.items.data[0].price.product.id,
      subscriptionStatus: subscriptionDetails.status,
      currentPeriodStart: new Date(subscriptionDetails.current_period_start * 1000),
    }
  
    switch(eventType) {
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
        const updatedSubData = {
          ...baseOptions,
          currentPeriodEnd: new Date(subscriptionDetails.current_period_end * 1000),
        }
  
        await updateCustomerSubscription(
          userId,
          subscriptionDetails.status,
          updatedSubData,
        )
        break;
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
        const deletedSubData = {
          ...baseOptions,
          currentPeriodEnd: subscriptionDetails.cancel_at 
            ? new Date(subscriptionDetails.cancel_at * 1000) 
            : null,
        }
  
        await updateCustomerSubscription(
          userId,
          subscriptionDetails.status,
          deletedSubData,
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Error managing subscription purchase:", error);
    throw new Error("Could not manage subscription purchase");
  }
}


export const updateCustomerSubscription = async (
  userId: string, 
  tier: string, 
  data: NewCustomer 
) => {
  try {
    await db.batch([
      db.update(users).set({ tier }).where(eq(users.id, userId)),
      db.update(customers).set(data).where(eq(customers.userId, userId))
    ]);
  } catch(error) {
    console.error('Error updating customer subscription status:', error);
    throw new Error('Could not update customer subscription status');
  }
}