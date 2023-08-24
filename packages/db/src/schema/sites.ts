import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const sites = pgTable("site", {
  name: text("name").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url"),
  created_at: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const record = pgTable("record", {
  created_at: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  id: uuid("id").primaryKey().defaultRandom(),
  site_id: uuid("site_id")
    .notNull()
    .references(() => sites.id, { onDelete: "cascade" }),
});
