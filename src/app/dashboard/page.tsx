// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { SignoutButton } from "@/components/buttons/signout-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Dashboard",
  description: "Welcome to the dashboard page, manage your account here",
}

export default async function DashboardPage(){
  return (
    <main className="min-h-[90dvh] grid place-items-center">
      <p>welcome to our dashboard page</p>
      <SignoutButton />
    </main>
  )
}