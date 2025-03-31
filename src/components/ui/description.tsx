// UTILS
import { cn } from "@/lib/utils";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const descriptionVariants = cva(
  "text-lg font-roboto font-normal", {
  variants: {
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      alternateOne: "text-alternate-one",
      alternateTwo: "text-alternate-two",
      neutral: "text-neutral"
    },
    size: {
      default: "text-lg",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-6xl"
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "default"
    }
  }
)

export interface DescriptionProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof descriptionVariants> {
  description?: string
}

export function Description({ description, className, variant, size, ...props }: DescriptionProps) {
  if (!description) return null;

  return (
    <h3 className={cn(descriptionVariants({ variant, size, className }))}
    {...props}
    >
      {description}
    </h3>
  )
}