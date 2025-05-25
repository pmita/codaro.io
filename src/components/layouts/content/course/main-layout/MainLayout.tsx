import styles from './styles.module.css';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <main className={styles.container}>
    {children}
  </main>
)