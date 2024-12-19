import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const Code = ({ className, ...props}: { className?: string}) => (
  <code
    className={cn(
      styles.container,
      className
    )}
    {...props}
  />
);