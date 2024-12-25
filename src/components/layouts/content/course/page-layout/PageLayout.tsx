import styles from './styles.module.css'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.layout}>{children}</section>
  )
}