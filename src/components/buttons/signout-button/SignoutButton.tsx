"use client"

// REACT
import { useCallback } from "react";
// COMPONENTS
import { Button, buttonVariants } from "@/components/ui/button";
// HOOKS
import { useSignoutMutation } from "@/hooks/mutations/useSignoutMutation"

export const SignoutButton = () => {
  // STATE & HOOKS
  const mutation = useSignoutMutation();

  // EVENTS
  const onClick = useCallback(() => mutation.mutate(), [mutation]);

  return (
    <Button className={buttonVariants({ size: "lg" })} onClick={onClick}>
      Sign Out
    </Button>
  )
}