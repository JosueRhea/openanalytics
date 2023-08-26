ALTER TABLE "record" ADD COLUMN "browser" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "device" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "referer" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "path" text;--> statement-breakpoint
ALTER TABLE "site" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
