"use server"

import fs from "fs";
import matter from "gray-matter";
import { serializeMDX } from "./utils";
import { Chapter } from "@/types/courses";


export const getCourseChapter = async (course: string, chapter: string): Promise<Chapter> => {
  const folder = `courses/${course}`;
  const file = `${folder}/${chapter}.md`;
  const code = fs.readFileSync(file, 'utf-8');
  const matterResults = matter(code);
  const fileName = file.replace('.md', '');

  const mdxSource = await serializeMDX(matterResults.content);

  return ({
    chapter: fileName,
    slug: `${course}/${fileName}`,
    slugAsParams: `${course}/${fileName}`,
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
    mdx: mdxSource,
  }); 
}