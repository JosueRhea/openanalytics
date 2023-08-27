"use server";

import { db, schema } from "@openanalytics/db";

export async function createSite(formData: FormData) {
  try {
    const data = schema.validateInsertSite(Object.fromEntries(formData));

    if (!data.success) {
      return { success: data.success, inputs: data.errors };
    }
    const newMonitor = await db
      .insert(schema.sites)
      .values(data.output)
      .returning();

    return { success: true, data: newMonitor };
  } catch (error) {
    console.log(error)
    return { success: false, error: { message: "Something went wrong" } };
  }
}
