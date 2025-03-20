export type UserSubscriptionStatusQuery = {
  id: string;
  tier: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd: Date;
}