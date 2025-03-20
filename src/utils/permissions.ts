import { differenceInCalendarDays } from "date-fns";

export enum PRO_STATUS {
  LIFE_TIME = 'lifetime',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
}

export const isSubscriptionValid = (tier: string | undefined | null, currentPeriodEnd: Date | undefined) => {
  // Early exit
  if(!tier || !currentPeriodEnd) return false;

  const todaysDay = new Date();
  const isPeriodValid = currentPeriodEnd > todaysDay;
  const daysPastExpired = differenceInCalendarDays(todaysDay, currentPeriodEnd);

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