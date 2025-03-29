import fs from 'fs';
import { getCourseChapter } from '@/data/content-2/course';
import { getIsChapterCompleted } from '@/data/progress/progress';
import { QueryClient } from '@tanstack/react-query';
import { MdxLayout, PageLayout } from "@/layouts/content/course";
import { ControlsLayout } from '@/layouts/content/course/controls-layout';
import { ToggleChapterProgress } from '@/components/chapter/toggle-chapter-progress';
import { ChapterNavigation } from '@/components/chapter/chapter-navigation/NavigationControls';
import { Mdx } from '@/components/mdx';
import { getUserProgress } from '@/data/db/progress';

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

  return (
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
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
