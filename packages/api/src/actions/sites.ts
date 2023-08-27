"use server";

import { db, eq, schema } from "@openanalytics/db";
import { withOwnUserAuth, withOwnUserAuthGet } from "../auth";
import { type Site } from "@openanalytics/db/src/schema";

export const createSite = withOwnUserAuth(
  async (formData: FormData, userId: string) => {
    try {
      const rawData = { ...Object.fromEntries(formData), userId };
      const data = schema.validateInsertSite(rawData);

      if (!data.success) {
        return { success: data.success, inputs: data.errors };
      }
      const newMonitor = await db
        .insert(schema.sites)
        .values(data.output)
        .returning();

      return { success: true, data: newMonitor };
    } catch (error) {
      console.log(error);
      return { success: false, error: { message: "Something went wrong" } };
    }
  },
);

export const getSites = withOwnUserAuthGet(
  async (
    userId: string,
  ): Promise<
    { data: Site[]; error: null } | { data: null; error: { message: string } }
  > => {
    try {
      const data = await db
        .select()
        .from(schema.sites)
        .where(eq(schema.sites.userId, userId));
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
);
