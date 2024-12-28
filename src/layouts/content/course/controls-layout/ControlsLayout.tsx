import styles from './styles.module.css';

export const ControlsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>
    {children}
  </div>
)