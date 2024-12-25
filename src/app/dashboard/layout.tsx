import { AuthCheck } from "@/components/auth-check";
import { DashboardNavbar } from "@/components/layouts/navigation";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <AuthCheck fallback={(<h1>You need to be signed in!</h1>)}>
        <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full h-[auto] scroll-auto p-5">
          <DashboardNavbar />
        </aside>
        <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
          {children}
        </section>
      </AuthCheck>
    </div>
  )
}