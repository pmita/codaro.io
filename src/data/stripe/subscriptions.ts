"use server"

// PACKAGES
import { stripe } from "@/lib/stripe/server/config"
// TYPES
import { StripeWebhookSubscirptionEvents } from "@/types/stripe"
import { getExistingCustomer, updateCustomerTable } from "../db/customer"
import { customers } from "@/db/schema"
import { db } from "@/db"
import { updateCustomerSubscriptionStatus, updateUserTierStatus } from "../db/user"

export const manageSubscriptionPurchase = async (
  subscriptionId: string,
  customerId: string,
  eventType: StripeWebhookSubscirptionEvents
) => {
  try {
    const { id, userId } = await getExistingCustomer(customerId);

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
      id,
      userId,
      stripeCustomerId: customerId
    }
  
    switch(eventType) {
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
        const updatedSubData = {
          ...baseOptions,
          currentPeriodEnd: new Date(subscriptionDetails.current_period_end * 1000),
        }
  
        await updateCustomerSubscriptionStatus(
          userId,
          id,
          subscriptionDetails.status,
          updatedSubData,
        )
        // await updateCustomerTable(id, {
        //   stripeSubscriptionId: subscriptionDetails.items.data[0].id,
        //   planName: subscriptionDetails.items.data[0].plan.nickname,
        //   stripeProductId: typeof subscriptionDetails.items.data[0].price.product === 'string'
        //     ? subscriptionDetails.items.data[0].price.product
        //     : subscriptionDetails.items.data[0].price.product.id,
        //   subscriptionStatus: subscriptionDetails.status,
        //   currentPeriodStart: new Date(subscriptionDetails.current_period_start * 1000),
        //   currentPeriodEnd: new Date(subscriptionDetails.current_period_end * 1000),
        //   id,
        //   userId,
        //   stripeCustomerId: customerId
        // });
        // await updateUserTierStatus(userId, subscriptionDetails.status);
        break;
      case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
        const deletedSubData = {
          ...baseOptions,
          currentPeriodEnd: subscriptionDetails.cancel_at 
            ? new Date(subscriptionDetails.cancel_at * 1000) 
            : null,
        }
  
        await updateCustomerSubscriptionStatus(
          userId,
          id,
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

