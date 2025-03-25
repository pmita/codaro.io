// NEXT
import { notFound } from 'next/navigation';
// DATA
import { getCourseChapter } from '@/data/db/courses';
import { getProgressChapter  } from '@/data/db/progress';
import { getCurrentUser } from '@/data/auth/currentUser';
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
// UTILS
import { serializeMDX } from '@/data/content/course/utils';

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
  const { slug: courseSlug, id: chapterSlug } = await params;
  const queryClient = new QueryClient();
  const chapterData = await getCourseChapter(courseSlug, chapterSlug);
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
      <div className="flex flex-col justify-center items-start gap-5">
        <h1>{chapterData.title}</h1>
        <p>{chapterData.description}</p>
      </div>
      <MdxLayout>
        <Mdx mdxSource={await serializeMDX(chapterData.content)} />
      </MdxLayout>
    </PageLayout>
  );
}
