import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Fix: Use parentheses for the function call
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

// Initialize the db connection with drizzle
export const db = drizzle(sql, { schema });
