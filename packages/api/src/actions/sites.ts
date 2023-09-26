"use server";

import { db, eq, schema } from "@openanalytics/db";
import { withOwnUserAuth, withOwnUserAuthGet } from "../auth";
import { type Site } from "@openanalytics/db/src/schema";
import { CommonSiteGetArgs, GetSiteStatsArgs } from "../types/sites";
import { ApiGetResponse } from "../types/global";

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
  }
);

export const getSites = withOwnUserAuthGet(
  async (userId: string): ApiGetResponse<Site[]> => {
    try {
      const data = await db
        .select()
        .from(schema.sites)
        .where(eq(schema.sites.userId, userId));
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  }
);

export const getSite = async ({ site_id }: CommonSiteGetArgs) => {
  try {
    const data = await db
      .select()
      .from(schema.sites)
      .where(eq(schema.sites.id, site_id));

    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};

// export const getSiteStats = ({range,site_id}: GetSiteStatsArgs) =>  {

// }
