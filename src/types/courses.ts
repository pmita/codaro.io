import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type Chapter = {
  chapter: string,
  title: string
  description?: string | undefined
  weight: number
  draft?: boolean | undefined
  vimeo?: number | undefined
  youtube?: string | undefined
  video_length?: string | undefined
  date: Date
  tags?: string[] | undefined
  stack?: string[] | undefined
  lastmod?: Date | undefined
  free?: boolean | undefined
  /** MDX file body */
  mdx?: MDXRemoteSerializeResult
  slug: string
  slugAsParams: string
}  