"use server"

// DATA
import { createNewStripeCustomer, retrieveExistingStripeCustomer } from "@/data/stripe";
import { calculateCurrentPeriodEnd, calculateTierStatus } from "./utils";
// DRIZZLE
import { db } from "@/db";
import { customers, NewCustomer, users } from "@/db/schema";
import { eq } from "drizzle-orm";
// STRIPE
import { stripe } from "@/lib/stripe/server/config";
import Stripe from "stripe";
// TYPES
import { PRO_STATUS, StripeWebhookCheckoutEvents, StripeWebhookSubscirptionEvents } from "@/types/stripe";

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
        tier: users.tier,
      })
      .from(customers)
      .innerJoin(users, eq(customers.userId, users.id))
      .where(eq(customers.stripeCustomerId, stripeCustomerId));

    if (existingCustomer.length === 0) {
      throw new Error("Customer not found");
    }

    const { userId, id, customerId, tier } = existingCustomer[0] ?? {};

    return { 
      userId,
      id,
      customerId,
      tier
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

export const manageLifeTimePurchase = async (checkoutSession: Stripe.Checkout.Session) => {
  try {
    const { userId } = await getExistingCustomer(checkoutSession.customer as string);

    if (!userId) {
      throw new Error("User not found");
    }

    await db
      .update(users)
      .set({
        tier: PRO_STATUS.LIFE_TIME,
      })
      .where(eq(users.id, userId));
    
  } catch(error) {
    console.error("Error managing lifetime purchase:", error);
    throw new Error("Could not manage lifetime purchase");
  }
}

export const manageSubscriptionPurchase = async (
  subscriptionId: string,
  customerId: string,
  eventType: StripeWebhookSubscirptionEvents | StripeWebhookCheckoutEvents
) => {
  try {
    const { userId, tier } = await getExistingCustomer(customerId);

    if (!userId) {
      throw new Error("User not found");
    }
  
    const subscriptionDetails = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method'],
    });

    const baseOptions = {
      stripeSubscriptionId: subscriptionDetails.items.data[0].id,
      planName: subscriptionDetails.items.data[0].plan.interval,
      stripeProductId: typeof subscriptionDetails.items.data[0].price.product === 'string'
        ? subscriptionDetails.items.data[0].price.product
        : subscriptionDetails.items.data[0].price.product.id,
      subscriptionStatus: subscriptionDetails.status,
      currentPeriodStart: subscriptionDetails.current_period_start 
        ? new Date(subscriptionDetails.current_period_start * 1000)
        : null,
      currentPeriodEnd: calculateCurrentPeriodEnd(subscriptionDetails, eventType)
    }
  
    switch(eventType) {
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
      case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_COMPLETED:
      case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED:
      case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED:
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
        const updatedSubData = {
          ...baseOptions,
        }

        await updateCustomerSubscription(
          userId,
          calculateTierStatus(tier as PRO_STATUS ?? PRO_STATUS.FREE, subscriptionDetails.status),
          updatedSubData,
        )
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