"use client" 

// COMPONENTS
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
// HOOKS
import { useUserSubscriptionStatusQuery } from "@/hooks/queries/useUserSubscriptionStatusQuery";
import { useRenderContent } from "./hooks/useRenderContent";


export const UserBilling = () => {
  // STATE & HOOKS
  const { data } = useUserSubscriptionStatusQuery();
  const { title, description, cta } = useRenderContent(data?.subscriptionStatus ?? null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cta}
        </CardContent>
      </Card>
    </>
  )
}