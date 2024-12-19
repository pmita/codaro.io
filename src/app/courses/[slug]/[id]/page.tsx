import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import matter from 'gray-matter';
import { cn } from '@/lib/utils';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm'; // Parse raw HTML
import rehypePrettyCode from "rehype-pretty-code"; // Sanitize HTML
import { Mdx } from '@/components/mdx';
import { MdxLayout } from '@/components/layouts/mdx-layout/MdxLayout';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    id: string[];
  }>;
}

const getCourseChapterMdx = async (params: any) => {
  const folder = `courses/${params.slug}`;
  const file = `${folder}/${params.id}.md`;
  const code = fs.readFileSync(file, 'utf-8');
  const matterResults = matter(code);
  return matterResults;
};

const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
  onVisitLine(node: { children: string | any[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedWord(node: { properties: { className: string[] } }) {
    node.properties.className = ["word--highlighted"]
  },
};


export default async function ChapterPage(props: ChapterPageProps) {
  const params = await props.params;
  const post = await getCourseChapterMdx(params);

  console.log(post);

  // Serialize the MDX content
  const mdxSource: MDXRemoteSerializeResult = await serialize(
    post.content, 
    { 
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
      parseFrontmatter: true }
  );

  console.log(typeof mdxSource.compiledSource);

  return (
    // <div className="p-4">
      <MdxLayout>
        <Mdx mdxSource={mdxSource} />
      </MdxLayout>
    // </div> 
  );
}
