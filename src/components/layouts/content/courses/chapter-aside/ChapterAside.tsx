import styles from './styles.module.css';

export const ChapterAside = ({ children }: { children: React.ReactNode }) => (
  <aside className={styles.container}>
    {children}
  </aside>
)