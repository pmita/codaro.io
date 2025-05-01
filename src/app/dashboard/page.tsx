// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { SignoutButton } from "@/components/buttons/signout-button";
import { titleVariants } from '@/components/ui/title';
import { cn } from '@/lib/utils';
import { Header } from "@/components/ui/header";
import { Title } from "@/components/ui/title";
import { Description } from "@/components/ui/description";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Dashboard",
  description: "Welcome to the dashboard page, manage your account here",
}

export default async function DashboardPage(){
  return (
    <main className="min-h-[90dvh] grid place-items-center">
      <Header className="justify-center items-center gap-4">
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
      <SignoutButton />
    </main>
  )
}