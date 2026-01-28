CREATE TABLE "dentist_registration" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"thumbnail" text NOT NULL,
	"category" text NOT NULL,
	"mode" text NOT NULL,
	"duration" text NOT NULL,
	"rating" real NOT NULL,
	"review_count" integer NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"what_you_learn" jsonb NOT NULL,
	"curriculum" jsonb NOT NULL,
	"who_is_this_for" jsonb NOT NULL,
	"faculty" jsonb NOT NULL,
	"faqs" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "dentist_registration_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "dentist_registration_slug_idx" ON "dentist_registration" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "dentist_registration_category_idx" ON "dentist_registration" USING btree ("category");--> statement-breakpoint
CREATE INDEX "dentist_registration_featured_idx" ON "dentist_registration" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "dentist_registration_popular_idx" ON "dentist_registration" USING btree ("popular");