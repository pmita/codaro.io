import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const SubHeader = ({ className, ...props}: { className?: string}) => (
  <h2
    className={cn(
      styles.subheader,
      className
    )}
    {...props}
  />
);