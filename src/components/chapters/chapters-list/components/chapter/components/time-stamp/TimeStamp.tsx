// COMPONENTS
import { Badge } from "@/components/ui/badge";
// UTILS
import { formatTimestamps } from "./utils";

export const TimeStamp = ({ time }: { time: number | null }) => {
  if (!time) {
    return null
  }

  return (
    <Badge>
      {formatTimestamps(time)}
    </Badge>
  )
}