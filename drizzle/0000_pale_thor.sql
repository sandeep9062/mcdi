CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"thumbnails" jsonb NOT NULL,
	"category" text NOT NULL,
	"mode" text NOT NULL,
	"duration" text NOT NULL,
	"rating" real NOT NULL,
	"review_count" integer NOT NULL,
	"enrollment_count" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"what_you_learn" jsonb NOT NULL,
	"curriculum" jsonb NOT NULL,
	"who_is_this_for" jsonb NOT NULL,
	"faculty" jsonb NOT NULL,
	"faqs" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "dentist_registration" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"thumbnails" jsonb NOT NULL,
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
CREATE TABLE "exam" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"full_name" text NOT NULL,
	"country" text NOT NULL,
	"country_flag" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"thumbnails" jsonb NOT NULL,
	"icon" text NOT NULL,
	"who_is_this_for" jsonb NOT NULL,
	"what_included" jsonb NOT NULL,
	"study_plan" jsonb NOT NULL,
	"reviews" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exam_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"college" text,
	"passing_year" text,
	"programme" text,
	"mode" text,
	"course_interest" text,
	"query" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "note" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"thumbnails" jsonb NOT NULL,
	"content" text NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"original_price" integer,
	"tags" jsonb NOT NULL,
	"date_created" text NOT NULL,
	"last_updated" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"popular" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "note_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"courseId" text,
	"testSeriesId" text,
	"videoId" text,
	"price" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"totalAmount" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"payment_method" text DEFAULT 'online' NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"transaction_id" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"course" text NOT NULL,
	"rating" integer NOT NULL,
	"date" text NOT NULL,
	"text" text NOT NULL,
	"avatar" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "test_series" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"thumbnails" jsonb NOT NULL,
	"category" text NOT NULL,
	"exam_type" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"rating" real NOT NULL,
	"review_count" integer NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"questions_count" integer NOT NULL,
	"duration" text NOT NULL,
	"difficulty" text NOT NULL,
	"what_included" jsonb NOT NULL,
	"sample_questions" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "test_series_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"thumbnails" jsonb NOT NULL,
	"youtube_id" text NOT NULL,
	"category" text NOT NULL,
	"duration" text NOT NULL,
	"views" integer NOT NULL,
	"date" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_testSeriesId_test_series_id_fk" FOREIGN KEY ("testSeriesId") REFERENCES "public"."test_series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_videoId_video_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "course_slug_idx" ON "course" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "course_category_idx" ON "course" USING btree ("category");--> statement-breakpoint
CREATE INDEX "course_featured_idx" ON "course" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "course_popular_idx" ON "course" USING btree ("popular");--> statement-breakpoint
CREATE INDEX "dentist_registration_slug_idx" ON "dentist_registration" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "dentist_registration_category_idx" ON "dentist_registration" USING btree ("category");--> statement-breakpoint
CREATE INDEX "dentist_registration_featured_idx" ON "dentist_registration" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "dentist_registration_popular_idx" ON "dentist_registration" USING btree ("popular");--> statement-breakpoint
CREATE INDEX "exam_slug_idx" ON "exam" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "exam_country_idx" ON "exam" USING btree ("country");--> statement-breakpoint
CREATE INDEX "note_slug_idx" ON "note" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "note_featured_idx" ON "note" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "note_popular_idx" ON "note" USING btree ("popular");--> statement-breakpoint
CREATE INDEX "review_course_idx" ON "review" USING btree ("course");--> statement-breakpoint
CREATE INDEX "review_rating_idx" ON "review" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "review_verified_idx" ON "review" USING btree ("verified");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "test_series_slug_idx" ON "test_series" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "test_series_category_idx" ON "test_series" USING btree ("category");--> statement-breakpoint
CREATE INDEX "test_series_exam_type_idx" ON "test_series" USING btree ("exam_type");--> statement-breakpoint
CREATE INDEX "test_series_featured_idx" ON "test_series" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "video_category_idx" ON "video" USING btree ("category");--> statement-breakpoint
CREATE INDEX "video_youtube_id_idx" ON "video" USING btree ("youtube_id");--> statement-breakpoint
CREATE INDEX "video_views_idx" ON "video" USING btree ("views");