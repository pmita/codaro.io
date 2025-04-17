export type UserSubscriptionStatus = {
  id: string;
  tier: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd: Date;
}

export type UserSubscriptionStatusQuery = UserSubscriptionStatus | null;
