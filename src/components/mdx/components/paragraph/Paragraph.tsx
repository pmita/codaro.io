import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const Paragraph = ({ className, ...props}: { className?: string}) => (
  <p
    className={cn(
      styles.paragraph,
      className
    )}
    {...props}
  />
);