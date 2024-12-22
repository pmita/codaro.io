import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getCourseChapters } from "@/data/courses";
import { ChaptersList } from "@/components/chapters-list";
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
  // const chapters = getCourseChapters(course);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['chapters', course],
    queryFn: async () => {
      return getCourseChapters(course);
    }
  })



  return (
    <section className="flex flex-wrap flex-row justify-center items-stretch">
      <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 order-2 lg:order-1 min-h-[90vh] overflow-scroll">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ChaptersList course={course} />
        </HydrationBoundary>
      </aside>
      <section className="flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </section>
  );
}