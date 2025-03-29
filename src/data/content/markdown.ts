"use server"

// PACKAGES
import fs from "fs";
import matter from "gray-matter";
// TYPES
import { MDXRemoteSerializeResult } from "next-mdx-remote"
// UTILS
import { serializeMDX } from "@/utils/serialize-mdx/serialize-mdx";

type ChapterMarkdownProps = {
  chapter: string;
  slug: string;
  slugAsParams: string;
  mdx: MDXRemoteSerializeResult;
}


export const getChapterMarkdown = async (chourseSlug: string, chapterSlug: string): Promise<ChapterMarkdownProps> => {
  const folder = `courses/${chourseSlug}`;
  const file = `${folder}/${chapterSlug}.md`;
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

export const getCourseMarkdown = async (course: string): Promise<any> => {
  // grab all the files within a course folder
  const folder = `courses/${course}`;
  const files = fs.readdirSync(folder);

  // search through all files and find the index.md file
  const indexFile = files.find((file: any) => file === 'index.md');
  const code = indexFile ? fs.readFileSync(`${folder}/${indexFile}`, 'utf-8') : null;
  const matterResults = indexFile && code ? matter(code) : null;
  const mdxSource = indexFile && code && matterResults ? await serializeMDX(matterResults.content) : null;

  return {
    course,
    mdx: mdxSource,
  }
};