import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
    url: process.env.DATABASE_URL!,
    // authToken: process.env.DATABASE_AUTH_TOKEN, // Uncomment for remote prod Turso
});

export const db = drizzle(client, { schema });
