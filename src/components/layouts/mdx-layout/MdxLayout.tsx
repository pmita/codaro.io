import styles from './styles.module.css'

export const MdxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.layout}>{children}</section>
  )
}