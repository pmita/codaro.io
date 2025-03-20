// STYLES
import styles from './styles.module.css';
// UTILS
import { cn } from '@/lib/utils';
// TYPES
import { StatusIndicatorProps } from './types';

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  return (
    <>
      {status ? (
        <div className={cn(styles.status, styles.completed)} />
      ): (
        <div className={cn(styles.status, styles.uncompleted)} />
      )}
    </>
  )
}