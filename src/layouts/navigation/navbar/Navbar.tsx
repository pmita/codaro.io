import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { AuthDialog } from "@/components/dialogs/auth-dialog"
import { cn } from "@/lib/utils"
import styles from './styles.module.css'
import { SubscriptionCheck } from "@/components/pemrissions/subscription-check"
import { getCurrentUser } from "@/data/auth/getCurrentUser"

export async function Navbar() {
  const currentUser = await getCurrentUser();


  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <h2 
            className={styles.logo}
          >
            Codaro<span className={styles.highlightedText}>.io</span>
          </h2>
        </Link>
      </div>
      <ul className={styles.linksContainer}>
        <li className={styles.link}>
          <SubscriptionCheck fallback={(
            <Link href={"/pro"}>
              Pro
            </Link>
          )}>
            {null}
          </SubscriptionCheck>
          </li>
        <li className={styles.link}>
          <Link href={"/blog"}>
            Blog
            </Link>
          </li>
        <li className={styles.link}>
          <Link href={"/courses"}>
            Courses
          </Link>
        </li>
        {currentUser ? (
          <li className={styles.link}>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "link", size: 'lg' }))}>
              Dashboard
            </Link>
          </li>
        ): <AuthDialog />}
      </ul>
    </nav>
  )
}