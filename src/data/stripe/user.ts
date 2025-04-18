import { adminDb } from "@/lib/firebase/server/config"
import { stripe } from "@/lib/stripe/server/config"
import Stripe from 'stripe';


export const getOrCreateCustomer = async (userId: string, params?: Stripe.CustomerCreateParams) => {
  const userDocument = await adminDb.collection('users').doc(userId).get();
  const { stripeCustomerId, email } = userDocument.data() ?? {};

  if (!stripeCustomerId) {
    const newlyCreatedCustomer = await stripe.customers.create({
      email,
      metadata: {
        firebaseUID: userId
      },
      ...params
    });

    await userDocument.ref.update({ stripeCustomerId: newlyCreatedCustomer.id });
    return newlyCreatedCustomer;
  } else {
    return await stripe.customers.retrieve(stripeCustomerId);
  }
}