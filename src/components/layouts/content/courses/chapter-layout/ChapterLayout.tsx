import styles from './styles.module.css';

export const ChapterLayout = ({ children }: { children: React.ReactNode }) => (
  <section className={styles.container}>
    {children}
  </section>
)