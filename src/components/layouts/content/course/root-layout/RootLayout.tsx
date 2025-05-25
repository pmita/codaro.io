// UTILS
import { cn } from '@/lib/utils';
// STYLE
import styles from './styles.module.css';

export const RootLayout = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <section className={cn(styles.wrapper, className)}>
    {children}
  </section>
)