import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const ListItem = ({ className, ...props}: { className?: string}) => (
  <li
    className={cn(
      styles.listItem,
      className
    )}
    {...props}
  />
);