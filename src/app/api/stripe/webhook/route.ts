// NEXT
import { headers } from "next/headers";
// DATA
import { manageSubscriptionPurchase, manageInvoice } from "@/data/db";

// PACKAGES
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server/config";
import { StripeWebhookEvents, StripeWebhookSubscirptionEvents } from "@/types/stripe";
import { manageLifeTimePurchase } from "@/data/db/customer";
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || '';

const relavantEvents = new Set([
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED,
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_UPDATED,
  StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_DELETED,
  StripeWebhookEvents.INVOICE_PAID,
  StripeWebhookEvents.INVOICE_PAYMENT_SUCCEEDED,
  StripeWebhookEvents.INVOICE_PAYMENT_FAILED,
  StripeWebhookEvents.INVOICE_UPCOMING,
  StripeWebhookEvents.INVOICE_MARKED_UNCOLLECTIBLE,
  StripeWebhookEvents.INVOICE_ACTION_REQUIRED,
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
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionPurchase(
            subscription.id,
            subscription.customer as string,
            event.type as StripeWebhookSubscirptionEvents
          );
          break;
        case StripeWebhookEvents.INVOICE_PAID:
        case StripeWebhookEvents.INVOICE_PAYMENT_SUCCEEDED:
        case StripeWebhookEvents.INVOICE_PAYMENT_FAILED:
        case StripeWebhookEvents.INVOICE_UPCOMING:
        case StripeWebhookEvents.INVOICE_MARKED_UNCOLLECTIBLE:
        case StripeWebhookEvents.INVOICE_ACTION_REQUIRED:
          const invoice = event.data.object as Stripe.Invoice;
          await manageInvoice(invoice);
          break;
        case StripeWebhookEvents.CHECKOUT_SESSION_COMPLETED:
        case StripeWebhookEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED:
        case StripeWebhookEvents.CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED:
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            await manageSubscriptionPurchase(
              checkoutSession.subscription as string,
              checkoutSession.customer as string,
              event.type as StripeWebhookSubscirptionEvents
            );
          }
          if (checkoutSession.mode === 'payment' && checkoutSession.payment_status == 'paid') {
            await manageLifeTimePurchase(checkoutSession);
          }
          break;
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