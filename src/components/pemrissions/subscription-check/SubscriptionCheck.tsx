"use client"

// HOOKS
import { useUserSubscriptionStatusQuery } from "@/hooks/queries/useUserSubscriptionStatusQuery";
// TYPES
import { SubscriptionCheckProps } from "./types"

export const SubscriptionCheck = ({ children, fallback }: SubscriptionCheckProps) => {
  const { data } = useUserSubscriptionStatusQuery();

  return (data?.canAccess ? <>{children}</> : <>{fallback}</>);
}