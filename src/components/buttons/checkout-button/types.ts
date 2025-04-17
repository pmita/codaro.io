// TYPES
import Stripe from "stripe";
// TYPES
import { ButtonProps } from "@/components/ui/button";
import { ProductPurchaseType } from "@/types/stripe";

export interface CheckoutButtonProps extends ButtonProps {
  stripeProduct: Stripe.Checkout.SessionCreateParams.LineItem;
  purchaseType?: ProductPurchaseType;
  callToAction?: string;
}