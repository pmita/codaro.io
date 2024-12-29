

export enum PRO_STATUS {
  LIFE_TIME = 'lifetime',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
  FREE = 'free',
}

export interface UserData {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  joined?: number;
  stripeCustomerId?: string;
  isPro?: boolean;
  expires?: number;
  proStatus?: PRO_STATUS;
  subscriptions?: {
    [key: string]: string;
  },
  courses?: {
    [key: string]: string;
  }
}