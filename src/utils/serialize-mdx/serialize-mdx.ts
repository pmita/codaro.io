// PACKAGES
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm'; // Parse raw HTML
import rehypePrettyCode from "rehype-pretty-code";
// CONFIG
import { PRETTY_CODE_CONFIG } from "./config";


export const serializeMDX = async (content: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(
    content,
    { 
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, PRETTY_CODE_CONFIG]],
      },
      parseFrontmatter: true 
    }
  )
}