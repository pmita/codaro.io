import { ProductPurchaseType } from "@/types/stripe";

export type PricingProps = {
  sellingPoint: string;
  price: string;
  frequency: string;
  productType: ProductPurchaseType;
  productId: string
}