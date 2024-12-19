import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const Header = ({ className, ...props}: { className?: string}) => (
  <h1
    className={cn(
      styles.header,
      className
    )}
    {...props}
  />
);