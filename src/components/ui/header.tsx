// UTILS
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col justify-center items-center gap-6",
        className
        )}
      {...props}
    >
      {children}
    </div>
  )
}