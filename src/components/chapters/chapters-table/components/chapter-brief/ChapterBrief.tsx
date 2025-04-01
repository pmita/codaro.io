
// TYPES
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
// TYPES
import { ChapterBriefProps } from './types';
// STYLES
import styles from './styles.module.css';

export const ChapterBrief = ({ title, description, weight }: ChapterBriefProps) => {
  return (
    <Card className={styles.container}>
      <span className={styles.chapterNumber}>
        {weight}
      </span>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={styles.description}>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}