"use server"

import { stripe } from "@/lib/stripe/server/config"
import Stripe from "stripe"



export const createNewStripeCustomer = async (email: string, metadata: any , params?: Stripe.CustomerCreateParams) => {
  let newlyCreatedCustomer: Stripe.Response<Stripe.Customer>;

  try {
    newlyCreatedCustomer = await stripe.customers.create({
      email,
      metadata,
      ...params
    });
  }catch(error){
    throw new Error(`Error creating new Stripe customer: ${(error as Error).message}`);
  }

  return newlyCreatedCustomer;
}

export const retrieveExistingStripeCustomer = async (customerId: string) => {
  return await stripe.customers.retrieve(customerId);
}