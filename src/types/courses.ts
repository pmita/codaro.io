export type Courses = {
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
  // body: MDX
  slug: string
  slugAsParams: string
}  