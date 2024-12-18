import type { MDXComponents } from 'mdx/types'
import { cn } from "@/lib/utils";
import '@/styles/mdx.css'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props}: { className?: string}) => (
      <h1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-poppins font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props}: { className?: string}) => (
      <h2
        className={cn(
          "mt-8 scroll-m-20 text-3xl font-poppins font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props}: { className?: string}) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-42l font-roboto font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props}: { className?: string}) => (
      <h4
        className={cn(
          "mt-8 scroll-m-20 text-xl font-roboto font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props}: { className?: string}) => (
      <h5
        className={cn(
          "mt-8 scroll-m-20 text-lg font-roboto font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props}: { className?: string}) => (
      <h6
        className={cn(
          "mt-8 scroll-m-20 text-base font-roboto font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    a: ({ className, ...props}: { className?: string}) => (
      <a
        className={cn(
          "font-medium underline underline-offset-4 text-primary-green",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props}: { className?: string}) => (
      <p
        className={cn(
          "leading-7 [&:not(:first-child)]:mt-6",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: { className?: string}) => (
      <ul 
        className={cn(
          "my-6 ml-6 list-disc", 
          className
        )} 
        {...props} 
      />
    ),
    ol: ({ className, ...props }: { className?: string }) => (
      <ol className={cn(
          "my-6 ml-6 list-decimal", 
          className
        )} 
        {...props} 
      />
    ),
    li: ({ className, ...props }: { className?: string }) => (
      <li className={cn(
          "mt-2", 
          className
        )} 
        {...props} 
      />
    ),
    blockquote: ({ className, ...props }: { className?: string }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    img: ({ className, alt, ...props}: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      (<img
        className={cn(
          "rounded border",
          className
        )}
        alt={alt}
        {...props}
      />)
    ),
    code: ({ className, ...props }: { className?: string }) => (
      <code
        className={cn(
          "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      />
    ),
    ...components,
  }
}