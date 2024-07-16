ALTER TABLE "user_query" ADD PRIMARY KEY ("ticket_id");--> statement-breakpoint
ALTER TABLE "user_query" ALTER COLUMN "ticket_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_query" DROP COLUMN IF EXISTS "id";