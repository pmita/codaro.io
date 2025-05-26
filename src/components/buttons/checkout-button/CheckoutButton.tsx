
"use client"

// NEXT
import Link from "next/link";
// REACT
import { useCallback, useState, useEffect } from "react";
// COMPONENTS
import { buttonVariants } from "../../../components/ui/button";
// HOOKS
import { useStripeCheckoutMutation } from "@/hooks/mutations/useStripeCheckoutMutation";
// UTILS
import { cn } from "@/lib/utils";
import { withAuth } from "@/utils/with-auth";
// TYPES
import { ProductPurchaseType } from "@/types/stripe";
import { CheckoutButtonProps } from './types'


export const Component = ({ 
  className, 
  stripeProduct, 
  purchaseType = ProductPurchaseType.ONE_TIME,
  callToAction = 'Buy Now',
  ...props
}: CheckoutButtonProps) => {
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

export const CheckoutButton = withAuth(Component, (
  <Link
    href="/signin"
    className={cn(buttonVariants({ variant: "default" }))}
  >
    Buy Now
  </Link>
))