import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const Img = ({ className, ...props}: { className?: string}) => (
  <img
    className={cn(
      styles.ordereddList,
      className
    )}
    {...props}
  />
);