// COMPONENTS
import { Bonuses } from './components/bonuses';
import { CheckoutButton } from '../buttons/checkout-button';
// TYPES
import { ProductCardProps } from './types';


export const ProductCard = ({ 
  title, 
  description, 
  price,
  frequency,
  sellingPoint, 
  bonuses,
  productType,
  productId
}: ProductCardProps) => {
  return (
    <div className="bg-white">
    <div className="mx-auto max-w-7xl">
      <div className="flex-col items-stretch justify-stretch border-[5px] border-solid border-secondary rounded-[12px] lg:mx-0 lg:flex lg:flex-row">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h3>
          <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-primary-black">What’s included</h4>
            <div className="h-px flex-auto bg-gray-100"></div>
          </div>
        <Bonuses bonuses={bonuses} />
        </div>
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full h-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-[8px] bg-primary py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16 items-stretch">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-gray-600">{sellingPoint}</p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">${price}</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">{frequency}</span>
              </p>
              <CheckoutButton 
                variant="secondary"
                className="mt-10 w-full hover:bg-indigo-500 hover:border-indigo-500 hover:text-primary-white"
                stripeProduct={{ quantity: 1, price: productId }}
                purchaseType={productType}
                callToAction="Buy Now"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}