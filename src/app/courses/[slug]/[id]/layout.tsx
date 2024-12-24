import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getCourseChapters } from "@/data/courses";
import { ChaptersList } from "@/components/chapters-list";
import { getCompletedChapters } from "@/data/progress";
import { ChapterLayout } from "@/components/layouts/content/courses/chapter-layout";
import { ChapterAside } from "@/components/layouts/content/courses/chapter-aside";
import { ChapterMain } from "@/components/layouts/content/courses/chapter-main";
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
    queryClient.prefetchQuery({
      queryKey: ['progression', course],
      queryFn: async () => {
        return await getCompletedChapters();
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    })
  ]);



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChapterLayout>
        <ChapterAside>
            <ChaptersList course={course} />
        </ChapterAside>
        <ChapterMain>
          {children}
        </ChapterMain>
      </ChapterLayout>
    </HydrationBoundary>
  );
}