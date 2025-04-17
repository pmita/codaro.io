
"use client"

// REACT
import { useCallback, useState, useEffect } from "react";
// DATA
import { initStripeCheckout } from "@/data/stripe/checkout";
// PACKAGES
import { toast } from "sonner";
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
    const session = await initStripeCheckout(ProductPurchaseType.RECURRING, [product]);

    // console.log('session --->', session);

    if (!session) {
      toast("Oops something went wrong", {
        description: "Could not create checkout session",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
      return;
    }

    if ('error' in session || !session) {
      toast("Oops something went wrong", {
        description: session.error,
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
      return;
    }

    const stripe = await loadStripeInJS();

    const { url, id } = session;
    if (url) {
      window.location.href = url;
    } else {
      toast("Oops something went wrong", {
        description: "Invalid URL",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
    }

    stripe?.redirectToCheckout({ sessionId: id });
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