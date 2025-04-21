export enum PRO_STATUS {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  LIFE_TIME = 'lifetime',
}

/*
  Stripe subscription status include the following values:
  - incomplete
  - incomplete_expired
  - trialing <- We don't use this
  - active
  - past_due
  - canceled
  - unpaid
  - paused
*/
