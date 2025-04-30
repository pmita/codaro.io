// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { UserBilling } from '@/components/cards/user-billing/UserBilling'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage(){
  return (
    <main className="flex flex-col items-stretch justify-start gap-4">
      <h1>Welcome to Billing page</h1>
      <Suspense fallback={( <Skeleton className="h-96 w-full" /> )}>
        <UserBilling />
      </Suspense>
    </main>
  )
}