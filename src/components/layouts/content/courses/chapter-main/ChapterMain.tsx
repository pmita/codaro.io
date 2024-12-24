import styles from './styles.module.css';

export const ChapterMain = ({ children }: { children: React.ReactNode }) => (
  <aside className={styles.container}>
    {children}
  </aside>
)