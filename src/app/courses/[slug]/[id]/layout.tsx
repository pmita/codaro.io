//COMPONENTS
import ChaptersList from "./_components/chapters-list";
// LIBRARIES
import { allCourses } from "@/.contentlayer/generated";
import { compareAsc } from "date-fns";
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

export default async function CourseChapterLayout(props: CourseChapterLayoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  console.log('params', params);
  // params: { slug: 'react', id: '1' }

  // const chapters = allCourses
  //   .filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')
  //   .sort((a, b) => compareAsc(a.weight, b.weight));

  return (
    <section className="flex flex-wrap flex-row justify-center items-stretch">
      {/* <ChaptersList chapters={chapters} /> */}
      <h1>These are all the chapters</h1>
      <section className="flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </section>
  );
}