import { AuthCheck } from '@/components/pemrissions/auth-check';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';
import { ProductCardProps } from './types';
import { Bonuses } from './components/bonuses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Pricing } from './components/pricing';
import { Divider } from './components/divider';
import styles from './styles.module.css';


export const ProductCardTest = ({ 
  title, 
  description, 
  price,
  frequency,
  sellingPoint, 
  bonuses,
  productType,
  productId
}: ProductCardProps) => {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>{title}</CardTitle>
        <CardDescription className={styles.description}>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Pricing 
          sellingPoint={sellingPoint}
          price={price}
          frequency={frequency}
          productType={productType}
          productId={productId}
        />
        <Divider />
        <Bonuses bonuses={bonuses} />
      </CardContent>
    </Card>
  )
}