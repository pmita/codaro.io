import styles from './styles.module.css';

export const ChapterStatusFallback = ({ isFree = false }: { isFree: boolean | undefined}) => {
  return (
    <>
      {isFree ? (
        <div className={styles.completed}></div>
      ) : (
        <div className={styles.uncompleted}></div>
      )}
    </>
  )
}