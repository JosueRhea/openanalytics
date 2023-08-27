ALTER TABLE "site" DROP CONSTRAINT "site_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "site" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "site" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "site" DROP COLUMN IF EXISTS "userId";