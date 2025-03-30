// NEXT
import Link from 'next/link';
// COMPONENTS
import { buttonVariants } from '@/components/ui/button';
// UTILS
import { cn } from '@/lib/utils';
// STYLES
import styles from './styles.module.css';
// TYPES
import { ChapterNavigationProps } from './types';

export const ChapterNavigation = ({ playPrevious, playNext }: ChapterNavigationProps) => {
  if (!playNext && !playPrevious) {
    return null;
  }

  console.log(playNext, playPrevious);

  return (
    <div className={styles.container}>
      {playPrevious ? (
        <Link
          href={playPrevious}
          className={cn(buttonVariants({
            variant: 'default',
            size: 'lg'
          }))}
        >
          Play Previous
        </Link>
      ): null}
      {playNext ? (
        <Link
          href={playNext}
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