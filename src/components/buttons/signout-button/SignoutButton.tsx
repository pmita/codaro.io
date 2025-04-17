"use client"

import { useCallback } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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