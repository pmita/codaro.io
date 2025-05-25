import { getCurrentUser } from "@/data/auth/actions/current-user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseLayout({ children }: CourseLayoutProps ) {
  // Fetch user status at root level to avoid multiple fetches for each /slug/id page
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    // queryFn: async () => {
    //   return await getUser();
    // },
    queryFn: async () => {
      return await getCurrentUser ();
    },
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    gcTime: 1000 * 60 * 60 * 2, 
  })



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}