
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

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

// TODO - ISR for all course/chapters combinations from db

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug:course, id: chapter } = await params;
  const currentUser = await getCurrentUser();
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['chapter', course, chapter],
      queryFn: async () => (
        await getCourseChapter(course, chapter)
      )
    }),
    queryClient.prefetchQuery({
      queryKey: ['chapter-progress', currentUser?.uid, course, chapter],
      queryFn: async () => {
        return await getProgressChapter(course, chapter);
      }
    })
  ])

  return (
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      <ControlsLayout>
        {/* <ChapterNavigation nextChapter={data.nextChapter} prevChapter={data.prevChapter} /> */}
        <ToggleChapterProgress 
          courseSlug={course}
          chapterSlug={chapter} 
        /> 
      </ControlsLayout>
      {/*<div className="flex flex-col justify-center items-start gap-5">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div> */}
      {/* <MdxLayout>
        <Mdx mdxSource={data.mdx } />
      </MdxLayout> */}
    </PageLayout>
  );
}
