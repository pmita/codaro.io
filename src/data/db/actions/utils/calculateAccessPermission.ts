import { PRO_STATUS } from "@/types/db";
// PACKAGES
import { differenceInCalendarDays } from "date-fns";


export const calculateAccessPermission = (tier: string, endDate: Date | null) => {
    const todaysDay = new Date();
    const isPeriodValid = endDate && endDate > todaysDay;
    const daysPastExpired = endDate 
      ? differenceInCalendarDays(todaysDay, endDate) 
      : 0;
  
    switch(tier) {
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