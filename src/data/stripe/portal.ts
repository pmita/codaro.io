"use server"

// DATA
import { getCurrentUser } from "@/data/auth/actions/current-user";
import { getOrCreateStripeCustomer } from '@/data/db';
// LIB
import { stripe } from "@/lib/stripe/server/config";

const PORTAL_RETURN_URL = "http://localhost:3000/dashboard"

export const initStripePortal = async () => {
    try {
      const user = await getCurrentUser();
      
      if (!user) {
        throw new Error("Unauthorized");
      }

      const customer = await getOrCreateStripeCustomer(user.uid);

      const session = await createStripePortalSession(customer.id);

      if (session) {
        return session;
      }
    } catch(error) {
      console.error("Error creating checkout session:", error);
      return { error: 'Could not create checkout session successfully' };
    }
  }

  export const createStripePortalSession = async (customerId: string) => {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: PORTAL_RETURN_URL,
    })

    return {
      url: session.url,
      id: session.id
    }
  }