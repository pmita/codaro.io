// REACT
import { Suspense } from "react";
// DATA
import { 
  getCourseChapters,
  getProgressChapters,
 } from "@/data/db/actions";
 import { getUserSubscriptionStatus } from "@/data/db/actions/user";
import { getCurrentUser } from "@/data/auth/actions/current-user";
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
} from "@/components/layouts/content/course";
import { AsideLayoutSkeleton } from "@/components/layouts/content/course/aside-layout/components/AsideLayoutSkeleton";
// COMPONENTS
import { ChaptersList } from "@/components/chapters/chapters-list";
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
  const { slug: courseSlug } = await params;
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();
  const allChapters = await getCourseChapters(courseSlug);

  if (currentUser) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['chapters-progress', currentUser?.uid, courseSlug],
        queryFn: () => (
          getProgressChapters(courseSlug)
        ),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      }),
      queryClient.prefetchQuery({
        queryKey: ['subscription-access', currentUser?.uid],
        queryFn: () => (
          getUserSubscriptionStatus()
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
                course={courseSlug} 
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