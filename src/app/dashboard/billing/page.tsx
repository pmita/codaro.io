// NEXT
import type { Metadata } from 'next'
// REACT
import { Suspense } from 'react'
// COMPONENTS
import { UserBilling } from '@/components/cards/user-billing/UserBilling'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from "@/components/ui/title";
import { Description } from "@/components/ui/description";
// UTILS
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage(){
  return (
    <main className="flex flex-col items-stretch justify-start gap-4">
      <Header className="justify-center items-start gap-4">
        <Title 
          title="Billing"
          className={cn(titleVariants({
            className: "capitalize"
          }))}
        />
        <Description
          description="Manage your billing settings"
        />
      </Header>
      <Suspense fallback={( <Skeleton className="h-96 w-full" /> )}>
        <UserBilling />
      </Suspense>
    </main>
  )
}