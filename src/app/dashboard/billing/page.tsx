// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { UserBilling } from '@/components/cards/user-billing/UserBilling'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage(){
  return (
    <>
      <h1>Welcome to Billing page</h1>
      <UserBilling />
    </>
  )
}