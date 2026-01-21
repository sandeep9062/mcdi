import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  index,
  integer,
  real,
  jsonb
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);



export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  totalAmount: integer("totalAmount").notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  paymentMethod: text("payment_method").notNull().default("online"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  transactionId: text("transaction_id"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("orderId").notNull().references(() => orders.id),
  courseId: text("courseId").references(() => course.id),
  testSeriesId: text("testSeriesId").references(() => testSeries.id),
  videoId: text("videoId").references(() => video.id),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});





export const course = pgTable(
  "course",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull(),
    price: integer("price").notNull(),
    originalPrice: integer("original_price"),
    thumbnail: text("thumbnail").notNull(),
    category: text("category").notNull(),
    mode: text("mode").notNull(), // 'Online' | 'Offline' | 'Both'
    duration: text("duration").notNull(),
    rating: real("rating").notNull(),
    reviewCount: integer("review_count").notNull(),
    featured: boolean("featured").default(false).notNull(),
    popular: boolean("popular").default(false).notNull(),
    whatYouLearn: jsonb("what_you_learn").notNull(), // string[]
    curriculum: jsonb("curriculum").notNull(), // { module: string; topics: string[]; }[]
    whoIsThisFor: jsonb("who_is_this_for").notNull(), // string[]
    faculty: jsonb("faculty").notNull(), // { name: string; title: string; image: string; bio: string; }
    faqs: jsonb("faqs").notNull(), // { question: string; answer: string; }[]
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("course_slug_idx").on(table.slug),
    index("course_category_idx").on(table.category),
    index("course_featured_idx").on(table.featured),
    index("course_popular_idx").on(table.popular),
  ],
);




export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college"),
  passingYear: text("passing_year"),
  programme: text("programme"),
  mode: text("mode"), // Online, Offline, Both
  courseInterest: text("course_interest"),
  query: text("query"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});






export const contact = pgTable("contact", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject"),
  message: text("subject").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});








export const exam = pgTable(
  "exam",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    fullName: text("full_name").notNull(),
    country: text("country").notNull(),
    countryFlag: text("country_flag").notNull(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull(),
    thumbnail: text("thumbnail").notNull(),
    icon: text("icon").notNull(),
    whoIsThisFor: jsonb("who_is_this_for").notNull(), // string[]
    whatIncluded: jsonb("what_included").notNull(), // string[]
    studyPlan: jsonb("study_plan").notNull(), // { phase: string; duration: string; focus: string[]; }[]
    reviews: jsonb("reviews").notNull(), // { name: string; text: string; rating: number; }[]
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("exam_slug_idx").on(table.slug),
    index("exam_country_idx").on(table.country),
  ],
);

export const testSeries = pgTable(
  "test_series",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull(),
    thumbnail: text("thumbnail").notNull(),
    category: text("category").notNull(),
    examType: text("exam_type").notNull(),
    price: integer("price").notNull(),
    originalPrice: integer("original_price"),
    rating: real("rating").notNull(),
    reviewCount: integer("review_count").notNull(),
    featured: boolean("featured").default(false).notNull(),
    questionsCount: integer("questions_count").notNull(),
    duration: text("duration").notNull(),
    difficulty: text("difficulty").notNull(), // 'Beginner' | 'Intermediate' | 'Advanced'
    whatIncluded: jsonb("what_included").notNull(), // string[]
    sampleQuestions: jsonb("sample_questions").notNull(), // { question: string; options: string[]; correctAnswer: number; explanation: string; }[]
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("test_series_slug_idx").on(table.slug),
    index("test_series_category_idx").on(table.category),
    index("test_series_exam_type_idx").on(table.examType),
    index("test_series_featured_idx").on(table.featured),
  ],
);

export const review = pgTable(
  "review",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    course: text("course").notNull(),
    rating: integer("rating").notNull(),
    date: text("date").notNull(),
    text: text("text").notNull(),
    avatar: text("avatar").notNull(),
    verified: boolean("verified").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("review_course_idx").on(table.course),
    index("review_rating_idx").on(table.rating),
    index("review_verified_idx").on(table.verified),
  ],
);

export const video = pgTable(
  "video",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail").notNull(),
    youtubeId: text("youtube_id").notNull(),
    category: text("category").notNull(),
    duration: text("duration").notNull(),
    views: integer("views").notNull(),
    date: text("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("video_category_idx").on(table.category),
    index("video_youtube_id_idx").on(table.youtubeId),
    index("video_views_idx").on(table.views),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  course: one(course, {
    fields: [orderItems.courseId],
    references: [course.id],
  }),
  testSeries: one(testSeries, {
    fields: [orderItems.testSeriesId],
    references: [testSeries.id],
  }),
  video: one(video, {
    fields: [orderItems.videoId],
    references: [video.id],
  }),
}));
