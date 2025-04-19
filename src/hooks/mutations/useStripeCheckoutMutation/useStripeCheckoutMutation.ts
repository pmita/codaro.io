// DATA
import { initStripeCheckout } from "@/data/stripe";
// PACKAGES
import Stripe from "stripe";
import { toast } from "sonner";
// HOOKS
import { useMutation } from "@tanstack/react-query";
// UTILS
import { loadStripeInJS } from "@/lib/stripe/client/config";
// TYPES
import { ProductPurchaseType } from "@/types/stripe";

export const useStripeCheckoutMutation = () => {
    return useMutation({
      mutationKey: ['stripe-checkout'],
      mutationFn: async ({
        purchaseType,
        lineItems,
      }: {
        purchaseType: ProductPurchaseType;
        lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
      }) => {
        const session = await initStripeCheckout(purchaseType, lineItems);

        if (!session) {
          throw new Error("Could not create checkout session");
        }

        if ('error' in session || !session) {
          throw new Error(session.error ?? 'Could not create checkout session');
        }

        const stripe = await loadStripeInJS();

        const { url, id } = session;
        if (url) {
          window.location.href = url;
        } else {
          throw new Error("Invalid URL");
        }
    
        stripe?.redirectToCheckout({ sessionId: id });
      },
      onError: (error) => {
        toast("Something went wrong", {
          description: error.message,
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          }
        })
      },
    })
}