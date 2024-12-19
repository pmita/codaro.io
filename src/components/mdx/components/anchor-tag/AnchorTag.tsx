import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const AnchorTag = ({ className, ...props}: { className?: string}) => (
  <a
    className={cn(
      styles.container,
      className
    )}
    {...props}
  />
);