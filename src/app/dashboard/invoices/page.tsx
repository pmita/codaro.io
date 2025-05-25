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
import { QueryClient } from "@tanstack/react-query";
import { getUserInvoices } from "@/data/db/actions/invoice";

export type SearchFiltersParams = {
  limit?: number | null;
  status?: string | null;
  sort?: string | null;
}

export default async function InvoicesPage({ searchParams }: { searchParams: SearchFiltersParams }) {
  const { status, limit, sort } = searchParams;
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['user-invoices'],
  //   queryFn: () => {
  //     getUserInvoices(10);
  //   },
  // });

  await queryClient.prefetchInfiniteQuery({
      queryKey: ['user-invoices', status, limit],
      initialPageParam: {
        limit: limit ?? 10,
        status: status ?? "paid",
        sort: sort ?? "asc",
      },
      queryFn: async ({ pageParam } : { pageParam: SearchFiltersParams }) => {
        return await getUserInvoices(pageParam);
      },
    });

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
      <Suspense fallback={( <Skeleton className="h-48 w-full" /> )}>
        <UserInvoices />
      </Suspense>
    </main>
  )
}