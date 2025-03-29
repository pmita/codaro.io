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