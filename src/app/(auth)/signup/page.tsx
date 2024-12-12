import type { Metadata } from 'next'
import { SignupForm } from '@/components/forms/signup-form'



export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/signin'),
  title: 'Sign Up',
  description: 'Sign up for an account'
}

export default async function SignupPage(){
  return (
    <main className="min-h-[90dvh] w-full flex justify-center items-stretch">
      <SignupForm /> 
    </main>
  )
}