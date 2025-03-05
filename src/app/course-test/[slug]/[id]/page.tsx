import fs from 'fs';
import { getCourseChapter } from '@/data/content/course';
import { getIsChapterCompleted } from '@/data/progress/progress';
import { QueryClient } from '@tanstack/react-query';
import { MdxLayout, PageLayout } from "@/layouts/content/course";
import { ControlsLayout } from '@/layouts/content/course/controls-layout';
import { ToggleChapterProgress } from '@/components/chapter/toggle-chapter-progress';
import { ChapterNavigation } from '@/components/chapter/chapter-navigation/NavigationControls';
import { Mdx } from '@/components/mdx';
import { getUserProgress } from '@/data/db/progress';
import { getCourseChapters } from '@/data/db/courses';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

// TODO - ISR for all course/chapters combinations from db
// export async function generateStaticParams(): Promise<{ slug: string; id: string; }[]> {
//   const allCourseFolders = fs.readdirSync('courses');
//   let chaptersPaths: { slug: any; id: any; }[] = [];

//   allCourseFolders.forEach((course: any) => {
//     const folder = `courses/${course}`;
//     const files = fs.readdirSync(folder);
//     files.forEach((file: any) => {
//       const fileName = file.replace('.md', '');
//       chaptersPaths.push({
//         slug: course,
//         id: fileName,
//       })
//     });
//   });

//   return chaptersPaths;
// }

export default async function ChapterPage(props: ChapterPageProps) {
  // const { slug:course, id: chapter } = await props.params;
  // const data = await getCourseChapter(course, chapter);
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['progress'],
  //   queryFn: async () => {
  //     return await getIsChapterCompleted(`${course}/${chapter}`);
  //   }
  // })

  const progressData = await getUserProgress();
  // const allChapters = await getCourseChapters(course);

  console.log('progressData here ------>', progressData);

  return (
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      {/* <ControlsLayout>
        <ChapterNavigation nextChapter={data.nextChapter} prevChapter={data.prevChapter} />
        <ToggleChapterProgress chapterId={data.slug} isFree={data.free} /> 
      </ControlsLayout>
      <div className="flex flex-col justify-center items-start gap-5">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div> */}
      {/* <MdxLayout>
        <Mdx mdxSource={data.mdx } />
      </MdxLayout> */}
    </PageLayout>
  );
}
