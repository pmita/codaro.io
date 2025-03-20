// UTILS
import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-primary", className)}
      {...props}
    /> 
  )
}