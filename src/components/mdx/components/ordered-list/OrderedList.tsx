import { cn } from "@/lib/utils";
import styles from './styles.module.css';

export const OrderedList = ({ className, ...props}: { className?: string}) => (
  <ol
    className={cn(
      styles.ordereddList,
      className
    )}
    {...props}
  />
);