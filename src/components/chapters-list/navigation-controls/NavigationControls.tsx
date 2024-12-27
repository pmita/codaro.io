import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavigationControlsProps } from './type';
import { StartOrEndEnum } from '@/types/courses';
import styles from './styles.module.css';

export const NavigationControls = ({ nextChapter, prevChapter }: NavigationControlsProps) => {

  return (
    <div className={styles.container}>
      {prevChapter !== StartOrEndEnum.START ? (
        <Link
          href={prevChapter}
          className={cn(buttonVariants({
            variant: 'default',
            size: 'lg'
          }))}
        >
          Play Previous
        </Link>
      ): null}
      {prevChapter !== StartOrEndEnum.END ? (
        <Link
          href={nextChapter}
          className={cn(buttonVariants({
            variant: 'default',
            size: 'lg'
          }))}
        >
          Play Next
        </Link>
      ): null}
    </div>
  )
}