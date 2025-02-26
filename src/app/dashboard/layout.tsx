import { AuthCheck } from "@/components/pemrissions/auth-check";
import { getCurrentUser } from "@/data/auth/getCurrentUser";
import { DashboardNavbar } from "@/layouts/navigation";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if(!user) redirect('/');

  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
        <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full h-[auto] scroll-auto p-5">
          <DashboardNavbar />
        </aside>
        <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
          {children}
        </section>
    </div>
  )
}