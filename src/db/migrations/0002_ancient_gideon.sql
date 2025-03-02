ALTER TABLE "users" ADD COLUMN "username" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "deleted_at";