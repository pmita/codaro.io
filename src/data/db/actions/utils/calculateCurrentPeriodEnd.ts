// PACKAGES
import Stripe from "stripe";
// TYPES
import { StripeWebhookSubscirptionEvents, StripeWebhookCheckoutEvents } from "@/types/stripe";

export const calculateCurrentPeriodEnd = (subscriptionDetails: Stripe.Response<Stripe.Subscription>, eventType: StripeWebhookSubscirptionEvents | StripeWebhookCheckoutEvents) => {
  switch(eventType) {
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
    case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED:
    case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_COMPLETED:
      return subscriptionDetails.current_period_end ? new Date(subscriptionDetails.current_period_end * 1000) : null;
    case StripeWebhookCheckoutEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED:
      return subscriptionDetails.ended_at ? new Date(subscriptionDetails.ended_at * 1000) : null;
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
      return subscriptionDetails.cancel_at ? new Date(subscriptionDetails.cancel_at * 1000) : null;
    default:
      return null;
  }
}