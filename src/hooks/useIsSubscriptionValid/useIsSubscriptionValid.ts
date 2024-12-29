import { differenceInDays } from "date-fns";
import { useUserQuery } from "../queries/useUserQuery"
import { PRO_STATUS } from "@/types/firestore";


export const useIsSubscriptionValid = () => {
  const { data: userDetails } = useUserQuery();

  if (!userDetails) {
    return false;
  }

  const expires = userDetails.expires ?? 0;
  const today = new Date().getTime();
  const isPeriodValid = expires > today;
  const daysPastExpired = differenceInDays(today, new Date(expires));

  switch(userDetails.proStatus) {
    case PRO_STATUS.LIFE_TIME:
      return true;
    case PRO_STATUS.ACTIVE:
    case PRO_STATUS.CANCELED:
      return isPeriodValid;
    case PRO_STATUS.PAST_DUE:
      return daysPastExpired < 7;
    case PRO_STATUS.UNPAID:
      return daysPastExpired < 15;
    default:
      return false;
  }
}