
"use client"

// REACT
import { useCallback, useState, useEffect } from "react";
// COMPONENTS
import { buttonVariants } from "../../../components/ui/button";
// HOOKS
import { useStripeCheckoutMutation } from "@/hooks/mutations/useStripeCheckoutMutation";
// UTILS
import { cn } from "@/lib/utils";
// TYPES
import { ProductPurchaseType } from "@/types/stripe";
import { CheckoutButtonProps } from './types'


export function CheckoutButton({ 
  className, 
  stripeProduct, 
  purchaseType = ProductPurchaseType.ONE_TIME,
  callToAction = 'Buy Now',
  ...props
}: CheckoutButtonProps) {
  // STATE & HOOKS
  const [product, setProduct] = useState({});
  const mutation = useStripeCheckoutMutation();

  // EFFECTS
  useEffect(() => {
    setProduct({
      quantity:  stripeProduct.quantity,
      price: stripeProduct.price
    })
  }, [stripeProduct.price, stripeProduct.quantity]);

  // EVENTS
  const handleClick = useCallback(async () => {
    mutation.mutate({
      purchaseType,
      lineItems: [product]
    })
  }, [mutation, product]);

  return (
    <button 
      className={cn(buttonVariants({ variant: 'default', className }))}
      onClick={handleClick}
      {...props}
    >
      {callToAction}
    </button>
  )
}