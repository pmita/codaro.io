import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getCourseChapters } from "@/data/courses";
import { ChaptersList } from "@/components/chapters-list";
import '@/styles/mdx.css';
import { getCompletedChapters } from "@/data/progress";
import { validateUserServerSide } from "@/data/auth";

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
      <section className="flex flex-wrap flex-row justify-center items-stretch">
        <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 order-2 lg:order-1 min-h-[90vh] overflow-scroll">
            <ChaptersList course={course} />
        </aside>
        <section className="flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
          {children}
        </section>
      </section>
    </HydrationBoundary>
  );
}