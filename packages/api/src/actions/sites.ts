"use server";

import { db, schema } from "@openanalytics/db";
import { withOwnUserAuth } from "../auth";

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
