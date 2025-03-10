import { ChapterItem } from "@/components/chapters-list/components/chapter-item";
import { getCurrentUser } from "@/data/auth/currentUser";
import { getCourseChapters } from "@/data/db/courses";
import { Link } from "lucide-react";


export default async function ChaptersList(courseSlug: string) {
  const currentUser = await getCurrentUser();
  const chapters = await getCourseChapters(courseSlug);

  return (
    <>
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slug}`} key={chapter.id} className="text-primary-error">
          <ChapterItem chapter={chapter} />
          {currentUser ? (
            <ChapterItem chapter={chapter} />
          ): (
            <ChapterStatusFallback isFree={chapter.isFree} />
          )}
        </Link>
      ))}
    </>
  );
}