ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "customers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "subscription_status_idx" ON "customers" USING btree ("subscription_status");--> statement-breakpoint
CREATE INDEX "customer_id_idx" ON "invoices" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "invoice_status_idx" ON "invoices" USING btree ("invoice_status");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");