"use server"

import { get } from "http";
import { validateUserServerSide } from "../auth"
import { getOrCreateCustomer } from "./user";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const PORTAL_RETURN_URL = "http://localhost:3000/dashboard"
const CHECKOUT_SUCCESS_URL = "http://localhost:3000/dashboard"
const CHECKOUT_CANCEL_URL = "http://localhost:3000/pro"

export const checkout = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]) => {
  const user = await validateUserServerSide();
  let customer: Stripe.Response<Stripe.Customer>;

  if (user) {
    const potentialCustomer = await getOrCreateCustomer(user.uid);
    if (!('deleted' in potentialCustomer)) {
      customer = potentialCustomer;
    } else {
      throw new Error("Customer has been deleted");
    }
  }

  try {
    const checkoutSession = await createCheckoutSession(customer?.id, user?.uid, 'one-time',lineItems);

    if (checkoutSession) {
      return checkoutSession;
    }
  } catch(error) {
    throw new Error('Could not create checkout session successfully');
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
    invoice_creation: {
      enabled: true
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
      });
      break;
  }

  return session;
}