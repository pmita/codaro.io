"use client"

import Link from "next/link"
import { dashboardConfig } from "@/config/navigation"
import { cn } from "@/lib/utils"
import { INavigationItem } from "./types"
import styles from './styles.module.css'

export function DashboardNavbar() {
  return (
    <nav className={styles.container}>
      {dashboardConfig.map((item: INavigationItem) => (
        <Link
          key={item.href} 
          href={item.href}
          className={cn(
            styles.item,
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}