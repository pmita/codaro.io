import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const UnOrderedList = ({ className, ...props}: { className?: string}) => (
  <ul
    className={cn(
      styles.ordereddList,
      className
    )}
    {...props}
  />
);