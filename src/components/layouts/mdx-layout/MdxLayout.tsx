import styles from './styles.module.css'
import { cn } from "@/lib/utils"

export const MdxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(styles.container, "prose")}>{children}</div>
  )
}