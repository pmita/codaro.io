// UTILS
import { cn } from "@/lib/utils";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const titleVariants = cva(
  "text-6xl font-poppins font-bold capitalize", {
  variants: {
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      neutral: "text-neutral"
    },
    size: {
      default: "text-md",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-6xl"
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "lg"
    }
  }
)

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof titleVariants> {}

export function Title({ 
  title, 
  className, 
  variant, 
  size, 
  ...props 
}: TitleProps) {
  if (!title) return null;

  return (
    <h1 
      className={cn(titleVariants({ variant, size, className }))}
      {...props}
    >
      {title}
    </h1>
  )
}