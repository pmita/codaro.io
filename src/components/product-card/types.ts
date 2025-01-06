import { ProductPurchaseType } from "@/types/stripe"


export type ProductCardProps = {
  title: string
  description: string
  price: string
  frequency: string
  sellingPoint: string
  bonuses: string[]
  productType: ProductPurchaseType
  productId: string
}