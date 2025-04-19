"use server"

// DATA
import { getExistingCustomer } from "@/data/db//customer";
import { db } from "@/db";
import { invoices, NewInvoice } from "@/db/schema";
// PACKAGES
import Stripe from "stripe";

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