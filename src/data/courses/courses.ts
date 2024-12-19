import fs from "fs";
import matter from "gray-matter";
import { compareAsc } from "date-fns";
import { Courses } from "@/types/courses";

export const getCourseChapters = async (params: Promise<{ slug: string, id: string }>) => {
  const slug = (await params).slug;
  const folder = `courses/${slug}`;
  const files = fs.readdirSync(folder);

  const codes = files.map((file: any) => {
    const code = fs.readFileSync(`${folder}/${file}`, 'utf-8');
    const matterResults = matter(code);
    const fileName = file.replace('.md', '');

    return ({
      chapter: fileName,
      slug: `${slug}/${fileName}`,
      title: matterResults.data?.title,
      description: matterResults.data?.description,
      weight: matterResults.data?.weight,
      draft: matterResults.data?.draft,
      vimeo: matterResults.data?.vimeo,
      youtube: matterResults.data?.youtube,
      video_length: matterResults.data?.video_length,
      date: matterResults.data?.date,
      lastmod: matterResults.data?.lastmod,
      free: matterResults.data?.free,
    })

  })
  return (codes as unknown as Courses[]).sort((a, b) => compareAsc(a.weight, b.weight));
}