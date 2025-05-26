"use client"

// HOOKS
import { useUserSubscriptionStatusQuery } from "@/hooks/queries/useUserSubscriptionStatusQuery";


export const witRequiredSubscription = <T extends object>(
  Component: React.FunctionComponent<T>,
  requiredSubscription: string[] | undefined,
) => (props: T) => {
  const { data } = useUserSubscriptionStatusQuery();

  if (requiredSubscription && requiredSubscription.includes(data?.subscriptionStatus || "")) {
    return <Component {...props} />;
  }

  return null;
};