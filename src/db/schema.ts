import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const pokemonCards = pgTable("pokemon_cards", {
  id: serial("id").primaryKey(),
  setNumber: varchar("set_number", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
