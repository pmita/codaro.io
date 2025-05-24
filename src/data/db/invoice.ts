"use server"

// DATA
import { getExistingCustomer } from "@/data/db";
import { getCurrentUser } from "../auth/currentUser";
// DRIZZLE
import { db } from "@/db";
import { customers, invoices, NewInvoice } from "@/db/schema";
import { and, eq, desc, lt } from "drizzle-orm";
// PACKAGES
import Stripe from "stripe";
// TYPES
import { IInvoiceFilters } from "./types";

export const getUserInvoices = async ({
  limit,
  status,
  sort,
  startAfter,
}: IInvoiceFilters ) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("No user found");
  }

  const conditions = [
    eq(customers.userId, currentUser.uid),
    eq(invoices.invoiceStatus, status ?? "paid"),
  ]

  if (startAfter) {
    conditions.push(lt(invoices.createdAt, startAfter));
  }

  const data = await db.select({
    id: invoices.id,
    customerId: customers.id,
    invoiceStatus: invoices.invoiceStatus,
    amountPaid: invoices.amountPaid,
    stripeInvoiceId: invoices.stripeInvoiceId,
    createdAt: invoices.createdAt,
  })
  .from(invoices)
  .innerJoin(customers, eq(invoices.customerId, customers.id))
  .where(and(...conditions))
  .orderBy(desc(invoices.createdAt))
  .limit(limit ?? 10);

  return data.length ? data : null;
}

export const manageInvoice = async (
  invoice: Stripe.Invoice,
) => {
  try {
    if (typeof invoice.customer !== "string" || !invoice.customer) {
        throw new Error("Invalid customer ID");
    }
    const { customerId } = await getExistingCustomer(invoice.customer);

    if (!customerId) {
      throw new Error("User not found");
    }

    const invoiceData = {
      customerId: customerId,
      invoiceStatus: invoice.status,
      stripeInvoiceId: invoice.id,
      amountPaid: invoice.amount_paid,
      createdAt: new Date(invoice.created * 1000),
    };

    await updateCustomerInvoice(invoiceData);
  } catch(error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    throw new Error("Error managing invoice record");
  }
}

export const updateCustomerInvoice = async (data: NewInvoice) => {
  try {
    await db.insert(invoices).values(data);
  } catch (error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    throw new Error("Error updating invoice record");
  }
}