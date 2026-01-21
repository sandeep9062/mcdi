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
