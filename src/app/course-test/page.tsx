
// DATA
import { getCourses } from "@/data/db/actions"
// COMPONENTS
import { Header } from "@/components/ui/header";
import { Description } from "@/components/ui/description";
import { Title,titleVariants } from "@/components/ui/title";
// UTILS
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/cards/course-card/CourseCard";

export default async function AllCoursesPage() {
  const coursesData = await getCourses();

  if (!coursesData) {
    return <h1>No courses available at this time</h1>
  }

  return (
    <section className="containter p-4 w-full">
      <Header className="justify-center items-center gap-4">
        <Title 
          title="Courses"
          className={cn(titleVariants({
            className: "capitalize"
          }))}
        />
        <Description
          description="All available courses"
        />
      </Header>
      <section className="grid grid-cols-[repeat(auto-fit,400px)] auto-rows-[580px] gap-8 mt-8 my-4 p-4 justify-center">
        {coursesData.map((course) => (
          <CourseCard 
            key={course.id} 
            title={course.title}
            description={course.description}
            slug={course.slug}
          />
        ))}
      </section>
    </section>
  )
}