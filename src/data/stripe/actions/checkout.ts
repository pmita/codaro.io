"use server"

// DATA
import { getOrCreateStripeCustomer } from '@/data/db';
import { getCurrentUser } from "@/data/auth/actions/current-user";
// PACKAGES
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server/config";

const PORTAL_RETURN_URL = "http://localhost:3000/dashboard"
const CHECKOUT_SUCCESS_URL = "http://localhost:3000/dashboard"
const CHECKOUT_CANCEL_URL = "http://localhost:3000/pro"

export const initStripeCheckout = async (
  purchaseType: 'one-time' | 'subscription' | 'recurring',
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    const customer = await getOrCreateStripeCustomer(user.uid);

    const checkoutSession = await createCheckoutSession(customer.id, user.uid, purchaseType ?? 'one-time', lineItems);

    if (checkoutSession) {
      return checkoutSession;
    }
  } catch(error) {
    console.error("Error creating checkout session:", error);
    return { error: 'Could not create checkout session successfully' };
  }
}

export const createCheckoutSession = async (
  stripeId: string,
  userId: string,
  type: 'one-time' | 'subscription' | 'recurring',
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
) => {
  let session;

  const baseOptions: Stripe.Checkout.SessionCreateParams = {
    success_url: CHECKOUT_SUCCESS_URL,
    cancel_url: CHECKOUT_CANCEL_URL,
    payment_method_types: ['card'],
    customer: stripeId,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    line_items,
    metadata: {
      firebaseUID: userId
    },
  }

  switch (type) {
    case 'recurring':
      session = await stripe.checkout.sessions.create({
        ...baseOptions,
        mode: 'subscription',
      })
      break;
    case 'one-time':
    default:
      session = await stripe.checkout.sessions.create({
        ...baseOptions,
        mode: 'payment',
        // INVOICE MODE ONLY ALLOWED FOR PAYMENTS MODE
        invoice_creation: {
          enabled: true
        },
      });
      break;
  }

  return { 
    url: session.url, 
    id: session.id,
  };
}