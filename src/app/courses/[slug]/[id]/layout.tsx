import { getCourseChapters } from "@/data/content-2/courses";
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
      queryFn: async () => {
        return await getCourseChapters(course);
      }
    }),
    // queryClient.prefetchQuery({
    //   queryKey: ['progress'],
    //   queryFn: async () => {
    //     return await getCompletedChapters();
    //   },
    //   staleTime: 1000 * 60 * 5,
    //   gcTime: 1000 * 60 * 30,
    // }),
  ]);



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RootLayout>
        <AsideLayout>
            <ChaptersList course={course} />
        </AsideLayout>
        <MainLayout>
          {children}
        </MainLayout>
      </RootLayout>
    </HydrationBoundary>
  );
}