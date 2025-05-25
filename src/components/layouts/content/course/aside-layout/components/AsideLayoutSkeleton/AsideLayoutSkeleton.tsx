// COMPONENTS
import { Skeleton } from '@/components/ui/skeleton';
// STYLES
import styles from '../../styles.module.css';

export const AsideLayoutSkeleton = () => (
  <aside className={styles.container}>
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
  </aside>
)