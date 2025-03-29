// NEXT
import { notFound } from "next/navigation";
// DATA
import { getCourseMarkdown } from "@/data/content/markdown";
import { getCourse } from "@/data/db/courses";
// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from "@/components/ui/title";
import { Description, descriptionVariants } from "@/components/ui/description";
import { Mdx } from "@/components/mdx";
// UTITLS
import { cn } from "@/lib/utils";

interface AllChaptersPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CourseDetailsPage({ params }: AllChaptersPageProps) {
  const { slug: courseSlug } = await params;
  const courseData = await getCourse(courseSlug);
  const courseMarkdown = await getCourseMarkdown(courseSlug);

  if (!courseData) { notFound(); }
  
  return (
    <>
      <Header>
        <Title 
          title={courseData.title}
          className={cn(titleVariants({
            size: "xl",
            className: "capitalize"
          }))}
        />
        <Description
          description={courseData.description}
        />
      </Header>
      <Mdx mdxSource={courseMarkdown.mdx} />
    </>
  )
}