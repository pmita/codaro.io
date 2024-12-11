"use client"

import { useAuth } from "@/hooks/useAuth"
import { AuthCheckProps } from "./types"

export const AuthCheck = ({ children, fallback }: AuthCheckProps) => {
  const { user } = useAuth();

  return (user ? <>{children}</> : <>{fallback}</>);
}