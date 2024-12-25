import { getCourseChapter } from '@/data/content/course';
import { MdxLayout } from "@/components/layouts/content/course";
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
    // <div className="p-4">
      <MdxLayout>
        <Mdx mdxSource={data.mdx } />
      </MdxLayout>
    // </div> 
  );
}
