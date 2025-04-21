// PACKAGES
import Stripe from "stripe";
// TYPES
import { PRO_STATUS } from "@/types/db";

export const calculateTierStatus = (
  currentTier: PRO_STATUS,
  subscriptionStatus: Stripe.Subscription.Status
): PRO_STATUS => {
  if (currentTier === PRO_STATUS.LIFE_TIME) {
    return PRO_STATUS.LIFE_TIME; // Preserve lifetime
  }

  switch (subscriptionStatus) {
    case 'active':
    case 'past_due':
      return PRO_STATUS.PRO;
    default:
      return PRO_STATUS.BASIC;
  }
};