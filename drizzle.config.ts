import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config();
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
