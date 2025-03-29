// NEXT
import { notFound } from 'next/navigation';
// DATA
import { getCourseChapter } from '@/data/db/courses';
import { getProgressChapter  } from '@/data/db/progress';
import { getCurrentUser } from '@/data/auth/currentUser';
import { getChapterMarkdown } from '@/data/content/markdown';
// DB
import { db } from '@/db';
import { chapters, courses } from '@/db/schema';
// PACKAGES
import { QueryClient } from '@tanstack/react-query';
// LAYOUTS
import { 
  MdxLayout, 
  PageLayout 
} from "@/layouts/content/course";
import { ControlsLayout } from '@/layouts/content/course/controls-layout';
// COMPONENTS
import { ToggleChapterProgress } from '@/components/chapter/toggle-chapter-progress';
import { ChapterNavigation } from '@/components/chapter/chapter-navigation/NavigationControls';
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
  const mdxSource = await getChapterMarkdown(courseSlug, chapterSlug);
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
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      <ControlsLayout>
        <ChapterNavigation
          playPrevious={`/course-test/${courseSlug}/${chapterData.previousChapterSlug}`}
          playNext={`/course-test/${courseSlug}/${chapterData.nextChapterSlug}`}
        />
        <ToggleChapterProgress 
          courseSlug={courseSlug}
          chapterSlug={chapterSlug} 
        /> 
      </ControlsLayout>
      <Header className="flex-start items-start">
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
      <MdxLayout>
        <Mdx mdxSource={mdxSource.mdx} />
      </MdxLayout>
    </PageLayout>
  );
}
