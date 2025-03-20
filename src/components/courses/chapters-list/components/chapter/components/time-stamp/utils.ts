import { format } from 'date-fns';

export const formatTimestamps = (ms: number) => {
  const date = new Date(ms);
  return format(date, 'm:ss');
}