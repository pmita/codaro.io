//COMPONENTS
import { ChaptersList } from "@/components/chapters-list";
// LIBRARIES
// import { allCourses } from "@/.contentlayer/generated";
// import { compareAsc } from "date-fns";
import fs from "fs";
import path from "path";
// STYLES
import '@/styles/mdx.css';

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

// const getCourseChapters = (slug: string, id: string) => {
//   const folder = `courses/${slug}`;
//   const files 
// }

const getChapterSlugs = (params: any) => {
  const folder = `courses/${params.slug}`;
  const files = fs.readdirSync(folder);
  const chapters = files.filter((file) => file.endsWith('.md'));

  return chapters.map((chapter) => chapter.replace('.md', ''));
}

export default async function CourseChapterLayout(props: CourseChapterLayoutProps) {
  const params = await props.params;
  const chapters = getChapterSlugs(params);

  const {
    children
  } = props;

  console.log('chapters', chapters);
  // params: { slug: 'react', id: '1' }

  // const chapters = allCourses
  //   .filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')
  //   .sort((a, b) => compareAsc(a.weight, b.weight));

  return (
    <section className="flex flex-wrap flex-row justify-center items-stretch">
      {/* <ChaptersList chapters={chapters} /> */}
      <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 order-2 lg:order-1 min-h-[90vh] overflow-scroll">
      {/* <h1>These are all the chapters</h1> */}
      <ChaptersList params={params} />
      </aside>
      <section className="flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </section>
  );
}