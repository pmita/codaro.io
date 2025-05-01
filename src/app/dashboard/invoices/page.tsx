// REACT
import { Suspense } from "react";
// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from "@/components/ui/title";
import { Description } from "@/components/ui/description";
import { UserInvoices } from "@/components/cards/user-invoices";
import { Skeleton } from "@/components/ui/skeleton";
// UTILS
import { cn } from "@/lib/utils";

export default async function InvoicesPage(){
  return (
    <main className="flex flex-col items-stretch justify-start gap-4">
      <Header className="justify-center items-start gap-4">
        <Title 
          title="Invoices"
          className={cn(titleVariants({
            className: "capitalize"
          }))}
        />
        <Description
          description="Manage your invoices"
        />
      </Header>
      <Suspense fallback={( <Skeleton className="h-96 w-full" /> )}>
        <UserInvoices />
      </Suspense>
    </main>
  )
}