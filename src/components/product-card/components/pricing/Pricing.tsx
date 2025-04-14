
// NEXT
import Link from "next/link"
// COMPONENTS
import { AuthCheck } from "@/components/pemrissions/auth-check"
import { Button, buttonVariants } from "@/components/ui/button"
import { CheckoutButton } from "@/components/buttons/checkout-button"
// UTILS
import { cn } from "@/lib/utils"
// STYLES
import styles from "./styles.module.css"
// TYPES
import { PricingProps } from "./types"

export const Pricing = ({
  sellingPoint,
  price,
  frequency,
  productType,
  productId
}: PricingProps) => (
  <div className={styles.container}>
    <p className={styles.text}>{sellingPoint}</p>
    <p className={styles.pricingContainer}>
      <span className={styles.price}>${price}</span>
      <span className={styles.frequency}>{frequency}</span>
    </p>
    <AuthCheck fallback={(
      <Link
        href="/signin"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Buy Now
      </Link>
    )}>
      <CheckoutButton 
        variant="secondary"
        className="mt-10 w-full hover:bg-indigo-500 hover:border-indigo-500 hover:text-primary-white"
        stripeProduct={{ quantity: 1, price: productId }}
        purchaseType={productType}
        callToAction="Buy Now"
      />
    </AuthCheck>
  </div>
)