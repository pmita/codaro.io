export type VideoPlayerProps = {
  videoId: string | null;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: Error) => void;
  isFree?: boolean;
}