"use client"

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { CUSTOM_COMPONENTS_LIST } from './constants';
import styles from './styles.module.css'

export const Mdx = ({ mdxSource }: { mdxSource: MDXRemoteSerializeResult | undefined }) => {
  if(!mdxSource) return null;
  
  return (
    <div className={styles.container}>
      <MDXRemote {...mdxSource} components={CUSTOM_COMPONENTS_LIST} />
    </div>
  );
}