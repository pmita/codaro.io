// DATA
import { getCourseChapters } from "@/data/db/courses";
import { getProgressChapters } from "@/data/db/progress";
import { getCurrentUser } from "@/data/auth/currentUser";
// PACKAGES
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
// LAYOUTS
import {
  RootLayout,
  AsideLayout,
  MainLayout
} from "@/layouts/content/course";
// COMPONENTS
import { AllChapters } from "@/components/courses/all-chapters";
// STYLES
import '@/styles/mdx.css';
import { getUserSubscriptionStatus } from "@/data/db/user";

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function CourseChapterLayout({ children, params}: CourseChapterLayoutProps ) {
  const { slug: course } = await params;
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();
  const allChapters = await getCourseChapters(course);

  if (currentUser) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['chapters-progress', course],
        queryFn: async () => (
          await getProgressChapters(course)
        ),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      }),
      queryClient.prefetchQuery({
        queryKey: ['subscription-status'],
        queryFn: async () => (
          await getUserSubscriptionStatus()
        )
      })
    ])
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RootLayout>
        <AsideLayout>
            <AllChapters 
              course={course} 
              allChapters={allChapters}
            />
        </AsideLayout>
        <MainLayout>
          {children}
        </MainLayout>
      </RootLayout>
    </HydrationBoundary>
  );
}