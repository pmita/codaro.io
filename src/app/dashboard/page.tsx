import { AuthCheck } from "@/components/auth-check";
import { SignoutButton } from "@/components/buttons/signout-button";

export default async function DashboardPage(){
  return (
    <main className="min-h-[90dvh] grid place-items-center">
      <AuthCheck fallback={(<h1>You need to be signed in</h1>)}>
        <SignoutButton />
      </AuthCheck>
    </main>
  )
}