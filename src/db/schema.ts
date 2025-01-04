import { pgTable, serial, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";

export const pokemonCards = pgTable("pokemon_cards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  set_number: integer("set_number").notNull(),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});
