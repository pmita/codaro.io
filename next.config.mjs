// import nextMDX from '@next/mdx';
import createMDX from '@next/mdx';
// import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  theme: 'github-dark',
}

/** @type {NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
  }
});

export default withMDX(nextConfig);