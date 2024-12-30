"use client"

import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid"
import { SubscriptionCheckProps } from "./types"

export const SubscriptionCheck = ({ children, fallback }: SubscriptionCheckProps) => {
  const canAccess = useIsSubscriptionValid();

  return (canAccess ? <>{children}</> : <>{fallback}</>);
}