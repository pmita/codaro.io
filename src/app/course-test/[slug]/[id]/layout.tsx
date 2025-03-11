import { getAllChapters, getCourseChapters } from "@/data/db/courses";
import { ChaptersList } from "@/components/chapters-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import {
  RootLayout,
  AsideLayout,
  MainLayout
} from "@/layouts/content/course";
import { getCompletedChapters } from "@/data/progress";
import '@/styles/mdx.css';
import { getUserProgress } from "@/data/db/progress";
import { getCurrentUser } from "@/data/auth/currentUser";
import { notFound } from "next/navigation";
import { AllChapters } from "@/components/courses/all-chapters";

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
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['chapters', course],
      queryFn: async () => (
        await getCourseChapters(course)
      )
    }),
    // queryClient.prefetchQuery({
    //   queryKey: ['progress'],
    //   queryFn: async () => (
    //     await getUserProgress(course)
    //   ),
    //   staleTime: 1000 * 60 * 5,
    //   gcTime: 1000 * 60 * 30,
    // })
  ]);

  const chapters = await getAllChapters(course);

  if (!chapters.length) { notFound(); }



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RootLayout>
        <AsideLayout>
            <AllChapters 
              chapters={chapters}
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