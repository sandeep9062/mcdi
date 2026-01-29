import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// This will now correctly read the cleaned URL from your .env
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
