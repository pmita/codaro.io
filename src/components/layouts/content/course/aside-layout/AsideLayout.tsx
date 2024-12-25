import styles from './styles.module.css';

export const AsideLayout = ({ children }: { children: React.ReactNode }) => (
  <aside className={styles.container}>
    {children}
  </aside>
)