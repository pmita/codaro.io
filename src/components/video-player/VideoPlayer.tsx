"use client"

// PACKAGES
import ReactPlayer from 'react-player/vimeo';
// HOOKS
import { useUserSubscriptionStatusQuery } from '@/hooks/queries/useUserSubscriptionStatusQuery';
// COMPONENTS
import { VideoLoading } from './components/video-loading';
import { UnauthorizedVideoFallback } from './components/unauthorized-video-fallback';
// CONSTANTS
import { VIDEO_BASE_URL } from './constants';
// STYLES
import styles from './styles.module.css';
// TYPES
import { VideoPlayerProps } from './types';

export const VideoPlayer = ({ videoId, isFree }: VideoPlayerProps) => {
  const videoUrl = VIDEO_BASE_URL + '/' + videoId;
  const { data } = useUserSubscriptionStatusQuery();

  if (!videoId) {
    return null;
  }

  return (
    <div className={styles.container}>
      {(isFree || data?.canAccess) ? (
        <div className={styles.videoContainer}>
          <ReactPlayer
            url={videoUrl}
            className={styles.videoPlayer}
            width="100%"
            height="100%"
            config={{
              playerOptions: {
                autoplay: false,
                controls: true,
                loop: false,
                muted: false,
              },
            }}
            fallback={<VideoLoading />}
            onPlay={() => console.log('Video is playing')}
            onPause={() => console.log('Video is paused')}
            onEnded={() => console.log('Video has ended')}
            onError={(error) => console.error('Video error:', error)}
          />
        </div>
      ) : (
        <UnauthorizedVideoFallback />
      )} 
    </div>
  )
}