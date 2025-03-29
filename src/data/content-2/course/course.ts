"use server"

import fs from "fs";
import matter from "gray-matter";
import { serializeMDX } from "../../../utils/serialize-mdx";
import { Chapter } from "@/types/courses";


export const getChapterMarkdown = async (course: string, chapter: string): Promise<any> => {
  const folder = `courses/${course}`;
  const file = `${folder}/${chapter}.md`;
  const code = fs.readFileSync(file, 'utf-8');
  const matterResults = matter(code);
  const fileName = file.replace('.md', '');

  const mdxSource = await serializeMDX(matterResults.content);

  return ({
    chapter: fileName.split('/').pop() || '',
    slug: fileName.split('/').slice(1).join('/'),
    slugAsParams: fileName.split('/').slice(1).join('/'),
    mdx: mdxSource,
  }); 
}