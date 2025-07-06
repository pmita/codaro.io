// NEXT
import type { Metadata } from 'next';
// COMPONENTS
import { SignupForm } from '@/components/forms/signup-form';

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com/signup"),
  title: "Sign Up",
  description: "Sign up to access your account",
};

export default async function SignupPage() {
  return (
    <SignupForm />
  );
}