import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sites = pgTable("site", {
  name: text("name").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url"),
  created_at: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
});

export const record = pgTable("record", {
  created_at: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  id: uuid("id").primaryKey().defaultRandom(),
  site_id: uuid("site_id")
    .notNull()
    .references(() => sites.id, { onDelete: "cascade" }),
  browser: text("browser"),
  country: text("country"),
  device: text("device"),
  referer: text("referer"),
  path: text("path")
});
