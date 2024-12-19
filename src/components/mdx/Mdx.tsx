"use client"

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { CUSTOM_COMPONENTS_LIST } from './constants';
import "./mdx.css";

export const Mdx = ({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) => {
  return (
    <MDXRemote {...mdxSource} components={CUSTOM_COMPONENTS_LIST}/>
  );
}