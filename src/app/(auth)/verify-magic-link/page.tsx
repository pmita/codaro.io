"use client"

// REACT
import { useEffect } from "react";
// HOOKS
import { useConfirmMagicLinkMutation } from "@/hooks/mutations/useConfirmMagicLinkMutation";

 

export default function MagicLinkAuthPage() {
  // STATE && VARIABLES
  const mutation = useConfirmMagicLinkMutation();

  // USE EFFECTS
  useEffect(() => {
    const href = window.location.href;
    const email = window.localStorage.getItem("emailForSignIn");

    mutation.mutate({
      email,
      authLink: href,
    });

  }, []);

  if (mutation.isError) {
    return (
      <h1>Something went wrong</h1>
    )
  }

  if (mutation.isPending) {
    return (
      <h1>Loading...</h1>
    )
  }



  return (
    <h1>Successfully signed in with magic link</h1>
  );
}