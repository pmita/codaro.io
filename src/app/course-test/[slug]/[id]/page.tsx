// NEXT
import { notFound } from 'next/navigation';
// DATA
import { 
  getCourseChapter,
  getProgressChapter
} from '@/data/db/actions';
import { getCurrentUser } from "@/data/auth/actions/current-user";
import { getChapterMarkdown } from '@/data/content';
// DB
import { db } from '@/data/db';
import { chapters, courses } from '@/data/db/schema';
// PACKAGES
import { QueryClient } from '@tanstack/react-query';
// LAYOUTS
import { 
  MdxLayout, 
} from "@/components/layouts/content/course";
// COMPONENTS
import { ToggleChapterProgress } from '@/components/chapters/chapter/toggle-chapter-progress';
import { ChapterNavigation } from '@/components/chapters/chapter/chapter-navigation';
import { Mdx } from '@/components/mdx';
import { Header } from '@/components/ui/header';
import { Description } from '@/components/ui/description';
import { Title, titleVariants } from '@/components/ui/title';
// UTILS
import { cn } from '@/lib/utils';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

// REVALIDATE EVERY HALF DAY
export const revalidate = 60 * 60 * 12;

// ISR PAGE CONTENTS
export async function generateStaticParams() {
  const allCourses = await db.select().from(courses);
  const allChapters = await db.select().from(chapters);

  const paths = allCourses.map((course) => {
    return allChapters.map((chapter) => {
      return {
        params: {
          slug: course.slug,
          id: chapter.slug
        }
      }
    })
  }).flat();

  return paths;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const queryClient = new QueryClient();
  const { slug: courseSlug, id: chapterSlug } = await params;
  const chapterData = await getCourseChapter(courseSlug, chapterSlug);
  const chapterMarkdown = await getChapterMarkdown(courseSlug, chapterSlug);
  const currentUser = await getCurrentUser();

  
  if (!chapterData) { notFound(); }
  
  if (currentUser) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['chapter-progress', currentUser?.uid, courseSlug, chapterSlug],
        queryFn: () => (
          getProgressChapter(courseSlug, chapterSlug)
        )
      })
    ]);
  }

  return (
    <section className="container p-4 w-full">
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      <ChapterNavigation
        playPrevious={`/course-test/${courseSlug}/${chapterData.previousChapterSlug}`}
        playNext={`/course-test/${courseSlug}/${chapterData.nextChapterSlug}`}
      />
      <div className="w-full py-4 flex justify-between items-center">
        <Header className="flex-start items-start gap-4">
          <Title 
            title={chapterData.title}
            className={cn(titleVariants({
              className: "capitalize"
            }))}
          />
          <Description
            description={chapterData.description}
          />
        </Header>
        <ToggleChapterProgress 
          courseSlug={courseSlug}
          chapterSlug={chapterSlug} 
        /> 
      </div>
      <div className="container max-w-3xl py-6 lg:py-12">
        <Mdx mdxSource={chapterMarkdown.mdx} />
      </div>
    </section>
  );
}
