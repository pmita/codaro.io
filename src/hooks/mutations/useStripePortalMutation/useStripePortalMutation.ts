// DATA
import { initStripePortal } from "@/data/stripe";
// PACKAGES
import { toast } from "sonner";
// HOOKS
import { useMutation } from "@tanstack/react-query";
// UTILS
import { loadStripeInJS } from "@/lib/stripe/client/config";

export const useStripePortalMutation = () => {
    return useMutation({
      mutationKey: ['stripe-portal'],
      mutationFn: async () => {
        const session = await initStripePortal();
    
        if (!session) {
          throw new Error("Could not create checkout session");
        }
    
        if ('error' in session || !session) {
          throw new Error(session.error ?? 'Could not create checkout session');
        }
    
        const { url, id } = session;
        if (session) {
          window.location.href = url;
        }

        const stripe = await loadStripeInJS();

        if (url) {
          window.location.href = url;
        } else {
          throw new Error("Invalid Portal URL");
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