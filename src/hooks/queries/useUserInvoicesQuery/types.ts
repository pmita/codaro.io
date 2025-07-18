// TYPES
import { Invoice, Customer } from "@/data/db/schema";

export type UserInvoicesQueryType = Pick<Invoice, 'id' | 'invoiceStatus' | 'amountPaid' | 'stripeInvoiceId' | 'createdAt'> & {
  customerId: Customer['id'];
};