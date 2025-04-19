"use client"

// REACT
import { useCallback } from "react";
// COMPONENTS
import { ButtonProps, buttonVariants } from "@/components/ui/button";
// HOOKS
import { useStripePortalMutation } from "@/hooks/mutations/useStripePortalMutation";
// UTITLS
import { cn } from "@/lib/utils";

export interface ManageSubscriptionButtonProps extends ButtonProps {}

export function ManageSubscriptionButton({ className, variant, ...props }: ManageSubscriptionButtonProps) {
  // STATE & HOOKS
  const mutation = useStripePortalMutation();

  // Events
  const handleClick = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return (
    <button 
      onClick={handleClick}
      className={cn(buttonVariants({ variant: "default", className }))}
      {...props}
    >
      Manage Subscription
    </button>
  );
}