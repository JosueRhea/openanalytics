import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema } from "drizzle-valibot";
import { flatten, minLength, safeParse, string, url } from "valibot";

export const sites = pgTable("site", {
  name: text("name").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
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
    mode: "string"
  }).defaultNow(),
  id: uuid("id").primaryKey().defaultRandom(),
  site_id: uuid("site_id")
    .notNull()
    .references(() => sites.id, { onDelete: "cascade" }),
  browser: text("browser"),
  country: text("country"),
  device: text("device"),
  referer: text("referer"),
  path: text("path"),
  ip: text("ip"),
  user_agent: text("user_agent"),
  city: text("city")
});

export const insertSiteSchema = createInsertSchema(sites, {
  url: string([url("Must be a vald url")]),
  name: string([minLength(1, "Please provide a name for your site")]),
  userId: string([minLength(1, "Missing userId")]),
});

export const insertRecordSchema = createInsertSchema(record, {
  site_id: string([minLength(1, "site_id is missing")])
});

export function validateInsertSite(input: unknown) {
  const data = safeParse(insertSiteSchema, input);
  if (!data.success) {
    return { ...data, errors: flatten(data.issues).nested };
  }
  return data;
}

export function validateInsertRecord(input: unknown) {
  const data = safeParse(insertRecordSchema, input);
  if (!data.success) {
    return { ...data, errors: flatten(data.issues).nested };
  }
  return data;
}

export type Site = typeof sites.$inferSelect;
export type Record = typeof record.$inferInsert;