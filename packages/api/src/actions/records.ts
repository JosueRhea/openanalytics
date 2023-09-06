"use server";
import { validateInsertRecord } from "@openanalytics/db/src/schema";

export const createRecord = async (req: Request) => {
  const data = validateInsertRecord(await req.json());
  console.log({ data });
  return { hello: "World" };
};
