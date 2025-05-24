"use client" 

import { Button, buttonVariants } from "@/components/ui/button";
// COMPONENTS
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
// HOOKS
import { useUserInvoicesQuery } from "@/hooks/queries/useUserInvoicesQuery";
import { cn } from "@/lib/utils";
import { formatStripeAmount } from "@/utils/format-stripe-amount";



export const UserInvoices = () => {
  // STATE & HOOKS
  const { data } = useUserInvoicesQuery();

  return (
    <>
      <Card>
        <CardContent>
          {data?.map((invoice) => {
            return (
              <li key={invoice.stripeInvoiceId} className="list-none">
                  <p>
                    <span>{invoice.stripeInvoiceId}</span>
                    {`for ${formatStripeAmount(invoice.amountPaid)} on ${invoice.createdAt.toLocaleDateString()}`}
                </p>
              </li>
            )
          })}
        </CardContent>
        <CardFooter>
          <Button className={cn(buttonVariants({
            variant: "default",
            size: "lg",
          }))}>
            View all invoices
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}