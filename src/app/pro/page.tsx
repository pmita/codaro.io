
import { ProductCardTest } from "@/components/product-card"
import { subscriptions } from "@/config/products"


const ProPage = () => {
  return (
    <div className="container">

    <section className="grid grid-cols-[1fr] gap-4 justify-center">
          {subscriptions.length && subscriptions.map((subscription) => (
            <ProductCardTest
              key={subscription.id}
              title={subscription.title}
              description={subscription.description}
              price={subscription.price}
              frequency={subscription.frequency}
              sellingPoint={subscription.sellingPoint}
              bonuses={subscription.bonuses}
              productType={subscription.purchaseType}
              productId={subscription.stripePriceId}
            />
          ))}
        </section>
    </div>
  )
}

export default ProPage;