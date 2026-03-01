import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    out: "./src/lib/db/migrations",
    dialect: "turso",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
