// REACT
import { Suspense } from "react";
// DATA
import { getCourseChapters } from "@/data/db/courses";
import { getProgressChapters } from "@/data/db/progress";
import { getCurrentUser } from "@/data/auth/currentUser";
import { getUserSubscriptionStatus } from "@/data/db/user";
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
import { AsideLayoutSkeleton } from "@/layouts/content/course/aside-layout/components/AsideLayoutSkeleton";
// COMPONENTS
import { ChaptersList } from "@/components/courses/chapters-list";
// STYLES
import '@/styles/mdx.css';

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
        <Suspense fallback={<AsideLayoutSkeleton />}>
          <AsideLayout>
              <ChaptersList 
                course={course} 
                allChapters={allChapters}
              />
          </AsideLayout>
        </Suspense>
        <MainLayout>
          {children}
        </MainLayout>
      </RootLayout>
    </HydrationBoundary>
  );
}