"use server";
import { validateInsertRecord } from "@openanalytics/db/src/schema";
import parser from "ua-parser-js";
import geoip from "fast-geoip";
import { COUNTRIES } from "../lib/countries";
import { db, schema } from "@openanalytics/db";

export const createRecord = async (formData: FormData) => {
  try {
    const parsedData = validateInsertRecord(Object.fromEntries(formData));
    if (!parsedData.success)
      return { success: parsedData.success, inputs: parsedData.errors };

    let dataToSave = { ...parsedData.output };

    const info = parser(parsedData.output.user_agent as string);

    dataToSave.browser = info.browser.name;
    dataToSave.device = info.os.name;

    const localization = await geoip.lookup(parsedData.output.ip ?? "");
    dataToSave.country =
      localization?.country != undefined
        ? COUNTRIES[localization.country]
        : "unknown";
    dataToSave.city = localization?.city || "unknown";

    const newRecord = await db
      .insert(schema.record)
      .values(dataToSave)
      .returning();

    return { success: true, data: newRecord };
  } catch (error) {
    console.log(error)
    return { success: false, error: { message: "Something went wrong" } };
  }
};
