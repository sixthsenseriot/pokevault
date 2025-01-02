import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const pokemonCards = pgTable("pokemon_cards", {
  id: serial("id").primaryKey(),
  set_number: varchar("set_number", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});
