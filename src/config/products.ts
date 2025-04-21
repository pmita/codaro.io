// TYPES
import { ProductPurchaseType } from "@/types/stripe"

export const subscriptions = [
  {
    id: 1,
    title: 'Monthly',
    description: "Trying on a month to month basis and on your own scedule",
    price: '25',
    frequency: '/ month',
    sellingPoint: 'Work at your own pace',
    bonuses: [
      "Unlimited access to Pro content",
      "High quality videos",
      "Access to github repos",
      "30-day moneyback guarenteee",
      "Access to discord"
    ],
    purchaseType: ProductPurchaseType.RECURRING,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MOTHLY_SUBSCRIPTION_PRICE_ID || ""
  },
  {
    id: 2,
    title: 'Quarterly',
    description: "For focused people who want to get started with a specific timeframe",
    price: '50',
    frequency: '/ yearly',
    sellingPoint: 'For dedicated users with a timeframe',
    bonuses: [
      "All Pro tier benefits",
      "Single payment, lifetime access",
      "High quality videos",
      "Access to github repos",
      "30-day moneyback guarentee",
      "Special merch"
    ],
    purchaseType: ProductPurchaseType.RECURRING,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_QUARTERLY_SUBSCRIPTION_PRICE_ID || ""
  },
  {
    id: 3,
    title: 'Yearly',
    description: "Jump in and out whenever you want",
    price: '165',
    frequency: '/ once',
    sellingPoint: 'Work at your own pace',
    bonuses: [
      "All Pro tier benefits",
      "Single payment, lifetime access",
      "High quality videos",
      "30-day moneyback guarentee",
      "Special merch",
      "Access to discord"
    ],
    purchaseType: ProductPurchaseType.RECURRING,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID || ""
  },
  {
    id: 4,
    title: 'Lieftime',
    description: "Pay now and get access to all content for life",
    price: '150',
    frequency: '/ once',
    sellingPoint: 'Work at your own pace',
    bonuses: [
      "All Pro tier benefits",
      "Single payment, lifetime access",
      "High quality videos",
      "30-day moneyback guarentee",
      "Special merch",
      "Access to discord",
      "Access to Projects freature",
    ],
    purchaseType: ProductPurchaseType.ONE_TIME,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRODUCT_PRICE_ID || ""
  }
]