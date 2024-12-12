import { SignoutButton } from "@/components/buttons/signout-button";

export default async function DashboardPage(){
  return (
    <main className="min-h-[90dvh] w-full flex justify-center items-stretch">
      <SignoutButton />
    </main>
  )
}