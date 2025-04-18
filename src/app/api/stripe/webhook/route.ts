// NEXT
import { headers } from "next/headers";
// PACKAGES
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server/config";
import { StripeWebhookEvents, StripeWebhookSubscirptionEvents } from "@/types/stripe";
import { manageSubscriptionPurchase } from "@/data/stripe/subscriptions";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || '';

const relavantEvents = new Set([
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED,
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_UPDATED,
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_DELETED,
  StripeWebhookEvents.INVOICE_PAID,
  StripeWebhookEvents.INVOICE_PAYMENT_SUCCEEDED,
  StripeWebhookEvents.INVOICE_PAYMENT_FAILED,
  StripeWebhookEvents.CHECKOUT_SESSION_COMPLETED,
]);

export async function POST(request: Request) {
  const requestBody = await request.text();
  const signature = (await headers()).get("Stripe-Signature") || "";
  let event: Stripe.Event;

  try {
    if (!signature && !webhookSecret) {
      throw new Error("Missing Stripe signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(requestBody, signature, webhookSecret);

    if(relavantEvents.has(event.type as StripeWebhookEvents)) {
      switch(event.type) {
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_DELETED:
          const subscriptionEvent = event.data.object as Stripe.Subscription;
          await manageSubscriptionPurchase(
            subscriptionEvent.id,
            subscriptionEvent.customer as string,
            event.type as StripeWebhookSubscirptionEvents
          );
          break;
        case StripeWebhookEvents.INVOICE_PAID:
        case StripeWebhookEvents.INVOICE_PAYMENT_SUCCEEDED:
        case StripeWebhookEvents.INVOICE_PAYMENT_FAILED:
        case StripeWebhookEvents.CHECKOUT_SESSION_COMPLETED:
          return;
        default: 
          throw new Error(`Unhandled event type ${event.type}`);
      }
    }
  } catch(error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    return new Response(`Webhook Error: ${(error as Error).message}`, { status: 400 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}