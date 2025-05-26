
"use client"

// HOOKS
import { useAuth } from "@/hooks/useAuth";


export const withAuth = <T extends object>(
  Component: React.FunctionComponent<T>,
  fallback?: React.ReactNode,
) => (props: T) => {
  const { user } = useAuth();

  if (user) {
    return <Component {...props} />;
  }

  return fallback ?? null;
};