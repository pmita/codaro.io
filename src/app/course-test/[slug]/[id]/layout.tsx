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

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function CourseChapterLayout({ children, params}: CourseChapterLayoutProps ) {
  const { slug: course } = await params;
  const currentUser = await getCurrentUser();
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['chapters', course],
      queryFn: async () => (
        await getCourseChapters(course)
      )
    }),
    queryClient.prefetchQuery({
      queryKey: ['chapters-progress', currentUser?.uid, course],
      queryFn: async () => (
        await getProgressChapters(course)
      ),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RootLayout>
        <AsideLayout>
            <AllChapters 
              course={course} 
            />
        </AsideLayout>
        <MainLayout>
          {children}
        </MainLayout>
      </RootLayout>
    </HydrationBoundary>
  );
}