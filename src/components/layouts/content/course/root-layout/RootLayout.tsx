import styles from './styles.module.css';

export const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <section className={styles.container}>
    {children}
  </section>
)