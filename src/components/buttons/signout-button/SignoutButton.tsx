"use client"

import { useCallback } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSignout } from "@/hooks/useSignout"

export const SignoutButton = () => {
  const mutation = useSignout();

  const onClick = useCallback(() => mutation.mutate(), [mutation]);

  return (
    <Button className={buttonVariants({ size: "lg" })} onClick={onClick}>
      Sign Out
    </Button>
  )
}