CREATE TABLE "note" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"thumbnail" text NOT NULL,
	"category" text NOT NULL,
	"subject" text NOT NULL,
	"content" text NOT NULL,
	"tags" jsonb NOT NULL,
	"author" text NOT NULL,
	"date_created" text NOT NULL,
	"last_updated" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "note_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "note_slug_idx" ON "note" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "note_category_idx" ON "note" USING btree ("category");--> statement-breakpoint
CREATE INDEX "note_featured_idx" ON "note" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "note_popular_idx" ON "note" USING btree ("popular");