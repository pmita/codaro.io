
// DATA
import { getCourseChapter } from '@/data/db/courses';
import { getProgressChapter  } from '@/data/db/progress';
import { getCurrentUser } from '@/data/auth/currentUser';
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
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { chapters, courses } from '@/db/schema';

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
  const { slug:course, id: chapter } = await params;
  const queryClient = new QueryClient();
  const chapterData = await getCourseChapter(course, chapter);
  const currentUser = await getCurrentUser();

  if (!chapterData) { notFound(); }

  if (currentUser) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['chapter-progress', course, chapter],
        queryFn: async () => {
          return await getProgressChapter(course, chapter);
        }
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
          playPrevious={`/course-test/${course}/${chapterData.previousChapterSlug}`}
          playNext={`/course-test/${course}/${chapterData.nextChapterSlug}`}
        />
        <ToggleChapterProgress 
          courseSlug={course}
          chapterSlug={chapter} 
        /> 
      </ControlsLayout>
      <div className="flex flex-col justify-center items-start gap-5">
        <h1>{chapterData.title}</h1>
        <p>{chapterData.description}</p>
      </div>
      {/* <MdxLayout>
        <Mdx mdxSource={data.mdx } />
      </MdxLayout> */}
    </PageLayout>
  );
}
