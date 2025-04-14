// TYPES
import { ButtonProps } from "@/components/ui/button";
import Stripe from "stripe";


export enum ProductPurchaseType {
  RECURRING = 'recurring',
  ONE_TIME = 'one-time'
}


export interface CheckoutButtonProps extends ButtonProps {
  stripeProduct: Stripe.Checkout.SessionCreateParams.LineItem;
  purchaseType?: ProductPurchaseType;
  callToAction?: string;
}