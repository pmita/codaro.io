import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const Blockquote = ({ className, ...props}: { className?: string}) => (
  <blockquote
    className={cn(
      styles.container,
      className
    )}
    {...props}
  />
);