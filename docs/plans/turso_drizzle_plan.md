# Implementation Plan: Local Turso + Drizzle ORM

We will add a local database layer using Turso's `sqld` running in Docker, paired with Drizzle ORM for type-safe Edge execution.

## Proposed Changes

### Docker & Database Setup
- **[NEW] `docker-compose.yml`**: Add a service to run `ghcr.io/tursodatabase/libsql-server`.
- **[NEW] `db/`**: Create a folder to persist the local database volume (`./db/.data`).
- Update `.gitignore` to ignore the local `.data` volume.

### Drizzle ORM Integration
- Install dependencies: `drizzle-orm`, `@libsql/client`, `drizzle-kit`, `dotenv`.
- **[NEW] `drizzle.config.ts`**: Configure drizzle-kit for local schema migrations.
- **[NEW] `src/lib/db/index.ts`**: Establish the libSQL connection (`createClient`) and Drizzle initialization.
- **[NEW] `src/lib/db/schema.ts`**: Define a fast, minimal Edge-compatible schema (e.g., a simple `users` or `logs` table).

### Environment Variables
- **[NEW] `.env.local`**: Add `DATABASE_URL=http://127.0.0.1:8080`.

## Verification Plan
1. Start the Docker container.
2. Run `drizzle-kit push:sqlite` to create the schema locally.
3. Add a simple database fetch operation to the `FastList` or a new component to verify the Edge runtime can retrieve data from the local `sqld` container.
