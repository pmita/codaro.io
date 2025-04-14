
"use client"

// REACT
import { useCallback, useState, useEffect } from "react";
// DATA
import { initStripeCheckout } from "@/data/stripe/checkout";
// COMPONENTS
import { buttonVariants } from "../../../components/ui/button";
// UTILS
import { cn } from "@/lib/utils";
import { loadStripeInJS } from "@/lib/stripe/client/config";
// TYPES
import { ProductPurchaseType, CheckoutButtonProps } from './types'


export function CheckoutButton({ 
  className, 
  stripeProduct, 
  purchaseType = ProductPurchaseType.ONE_TIME,
  callToAction = 'Buy Now',
  ...props
}: CheckoutButtonProps) {
  // STATE
  const [product, setProduct] = useState({});

  // EFFECTS
  useEffect(() => {
    setProduct({
      quantity:  stripeProduct.quantity,
      price: stripeProduct.price
    })
  }, [stripeProduct.price, stripeProduct.quantity]);

  // EVENTS
  const handleClick = useCallback(async () => {
    const session = await initStripeCheckout(ProductPurchaseType.ONE_TIME, [product]);

    const stripe = await loadStripeInJS();
    if (session) {
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("Session URL is null");
      }
      stripe?.redirectToCheckout({ sessionId: session.id });
    }
  }, [product, purchaseType]);

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