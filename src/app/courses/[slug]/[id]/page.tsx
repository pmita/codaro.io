import { getCourseChapter } from '@/data/content/course';
import { MdxLayout, PageLayout } from "@/components/layouts/content/course";
import { NavigationControls } from '@/components/chapter/navigation-controls';
import { ControlsLayout } from '@/components/layouts/content/course/controls-layout';
import { ToggleChapterProgress } from '@/components/chapter/toggle-chapter-progress';
import { Mdx } from '@/components/mdx';
import fs from 'fs';
import { QueryClient } from '@tanstack/react-query';
import { getIsChapterCompleted } from '@/data/progress/progress';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export async function generateStaticParams(): Promise<{ slug: string; id: string; }[]> {
  const allCourseFolders = fs.readdirSync('courses');
  let chaptersPaths: { slug: any; id: any; }[] = [];

  allCourseFolders.forEach((course: any) => {
    const folder = `courses/${course}`;
    const files = fs.readdirSync(folder);
    files.forEach((file: any) => {
      const fileName = file.replace('.md', '');
      chaptersPaths.push({
        slug: course,
        id: fileName,
      })
    });
  });

  return chaptersPaths;
}

export default async function ChapterPage(props: ChapterPageProps) {
  const { slug:course, id: chapter } = await props.params;
  const data = await getCourseChapter(course, chapter);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      return await getIsChapterCompleted(`${course}/${chapter}`);
    }
  })

  return (
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      <ControlsLayout>
        <NavigationControls nextChapter={data.nextChapter} prevChapter={data.prevChapter} />
        <h1>Controls go here</h1>
        <ToggleChapterProgress chapterId={data.slug} isFree={data.free} /> 
        {/*ToggleChapterProgress */}
      </ControlsLayout>
      <div className="flex flex-col justify-center items-start gap-5">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <MdxLayout>
        <Mdx mdxSource={data.mdx } />
      </MdxLayout>
    </PageLayout>
  );
}
