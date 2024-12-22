import fs from "fs";
import matter from "gray-matter";
import { compareAsc } from "date-fns";
import { Courses } from "@/types/courses";

export const getCourseChapters = (course: string) => {
  // grab all the files within a course folder
  const folder = `courses/${course}`;
  const files = fs.readdirSync(folder);

  // read through each file and grab the frontmatter
  const codes = files.map((file: any) => {
  const code = fs.readFileSync(`${folder}/${file}`, 'utf-8');
  const matterResults = matter(code);
  const fileName = file.replace('.md', '');

  // shape the data
    return ({
      chapter: fileName,
      slug: `${course}/${fileName}`,
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
    });
  })

  // sort the data by weight
  return (codes as unknown as Courses[]).sort((a, b) => compareAsc(a.weight, b.weight));
};