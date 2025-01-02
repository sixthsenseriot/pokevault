import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { pokemonCard } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export { db };
