// NEXT
import type { Metadata } from 'next';
// COMPONENTS
import { MagicLinkAuthForm } from '@/components/forms/magic-link-auth-form';

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com/signin"),
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function SigninPage() {
  return (
    <MagicLinkAuthForm />
  );
}