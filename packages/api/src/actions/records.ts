"use server";
import { record, validateInsertRecord } from "@openanalytics/db/src/schema";
import parser from "ua-parser-js";
import geoip from "fast-geoip";
import { COUNTRIES } from "../lib/countries";
import { db, eq, schema, sql } from "@openanalytics/db";
import {
  CommonSelectRecordsArgs,
  RecordByHits,
  RecordsByCountry,
  RecordsByHits,
  RecordsBySingleVisitors,
} from "../types/records";
import { ApiGetResponse } from "../types/global";
import { CommonSiteGetArgs } from "../types/sites";

export const createRecord = async (formData: FormData) => {
  try {
    const parsedData = validateInsertRecord(Object.fromEntries(formData));
    if (!parsedData.success)
      return { success: parsedData.success, inputs: parsedData.errors };

    let dataToSave = { ...parsedData.output };

    const info = parser(parsedData.output.user_agent as string);

    dataToSave.browser = info.browser.name;
    dataToSave.device = info.os.name;
    // dataToSave.created_at = new Date().toUTCString()

    const localization = await geoip.lookup("207.97.227.239" ?? "");

    dataToSave.country =
      localization?.country != undefined
        ? COUNTRIES[localization.country]
        : "unknown";

    dataToSave.ip = "207.97.227.239";

    dataToSave.city = localization?.city || "unknown";

    const newRecord = await db
      .insert(schema.record)
      .values(dataToSave)
      .returning();

    return { success: true, data: newRecord };
  } catch (error) {
    console.log(error);
    return { success: false, error: { message: "Something went wrong" } };
  }
};

export const getRecorByHits = async ({
  range,
  site_id,
}: CommonSelectRecordsArgs): ApiGetResponse<RecordsByHits> => {
  try {
    const statement = sql`with dates as (
      select generate_series(
        date_trunc('day', now() - interval '${sql.raw(
          range
        )}')::timestamp with time zone,
        date_trunc('day', now())::timestamp with time zone,
        interval '1 day'
        ) as date
      )
      select
        dates.date,
        coalesce(count(record.site_id), 0) as views
      from
        dates
        left join record on date_trunc('day', record.created_at) = dates.date
        and record.site_id = '${sql.raw(site_id)}'
      group by
      dates.date
      order by
      dates.date asc;
    `;

    const data: RecordByHits[] = await db.execute(statement);
    // console.log(typeof data[0].date.toString())
    let total = 0;
    const parsedData = data.map((record) => {
      const hits = Number(record.views);
      total += hits;
      return {
        ...record,
        views: hits,
      };
    }) as RecordByHits[];

    return { data: { records: parsedData, totalHits: total }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const getRecordsByCountry = async ({
  range,
  site_id,
}: CommonSelectRecordsArgs) => {
  try {
    const statement = sql`
    WITH time_range AS (
      SELECT date_trunc('day', now() - interval '${sql.raw(
        range
      )}')::timestamp with time zone AS start_date,
             date_trunc('day', now() + interval '1 day')::timestamp with time zone AS end_date
    ),
    country_counts AS (
      SELECT
        record.country,
        coalesce(count(record.site_id), 0) AS hits
      FROM
        record
      WHERE
        record.site_id = '${sql.raw(site_id)}'
        AND record.created_at >= (SELECT start_date FROM time_range)
        AND record.created_at <= (SELECT end_date FROM time_range)
      GROUP BY
        record.country
    )
    SELECT
      country_counts.country,
      country_counts.hits
    FROM
      country_counts
    ORDER BY
      country_counts.country;
    `;

    const res: RecordsByCountry[] = await db.execute(statement);
    return { data: res, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const getRecordsBySingleVisitors = async ({
  site_id,
}: CommonSiteGetArgs): ApiGetResponse<RecordsBySingleVisitors> => {
  try {
    // const data = await db
    //   .select({
    //     single_visitors: sql<number>`count(distinct ${schema.record.ip})`.mapWith(Number),
    //   })
    //   .from(schema.record)
    //   .where(eq(schema.record.id, site_id))
    const stmt = sql`
    select
  coalesce(count(distinct ip), 0) as total
from
  record
where
  site_id = '${sql.raw(site_id)}';`;
    const data = (await db.execute(stmt)) as RecordsBySingleVisitors[];
    return { data: { total: Number(data[0].total) }, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};
