// COMPONENTS
import { 
  Card, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
// UTILS
import { truncate } from "@/utils/turncate";
// STYLES
import styles from "./styles.module.css";
// TYPES
import { CourseFields } from "./types";


export const CourseCard = ({ title, description }: CourseFields) => {
  return (
    <Card className={styles.container}>
      <CardHeader className={styles.cardHeader}>
        <h1>test</h1>
      </CardHeader>
      <CardDescription className={styles.content}>
        <CardTitle className={styles.title}>
          {title}
        </CardTitle>
        {truncate(description, 150)}
      </CardDescription>
      <CardFooter className={styles.footer}>
        <p>more test</p>
      </CardFooter>
    </Card>
  );
}