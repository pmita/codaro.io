import { SignoutButton } from "@/components/buttons/signout-button";

export default async function DashboardPage(){
  return (
    <main className="min-h-[90dvh] grid place-items-center">
      <p>welcome to our dashboard page</p>
      <SignoutButton />
    </main>
  )
}