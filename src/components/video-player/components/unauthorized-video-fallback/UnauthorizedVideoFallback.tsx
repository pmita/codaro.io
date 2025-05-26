// NEXT
import Link from "next/link";
// COMPONENTS
import { buttonVariants } from "@/components/ui/button";
// UTILS
import { cn } from "@/lib/utils";
// STYLES
import styles from './styles.module.css';


export const UnauthorizedVideoFallback = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>You can not view this video, upgrade now</h2>
    <Link
      href="/pro"
      className={cn(buttonVariants({
        variant: 'default',
        className: styles.margin
      }))}
    >
      Upgrade to PRO
    </Link>
  </div>
)