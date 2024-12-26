import { getCourseChapter } from '@/data/content/course';
import { MdxLayout, PageLayout } from "@/components/layouts/content/course";
import { Mdx } from '@/components/mdx';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ChapterPage(props: ChapterPageProps) {
  const { slug:course, id: chapter } = await props.params;
  const data = await getCourseChapter(course, chapter);

  return (
    <PageLayout>
      <div className="grid place-items-center w-full h-[650px] bg-primary">
        <h1>Video Player goes here</h1>
      </div>
      <div className="grid place-items-center w-full h-[100px] bg-secondary">
        <h1>Controls go here</h1>
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
