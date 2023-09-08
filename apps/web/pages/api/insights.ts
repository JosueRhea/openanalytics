import { createRecord } from "@openanalytics/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404);
  try {
    if (req.headers.origin) {
      const parsedUrl = new URL(req.headers.origin);
      res.setHeader("Access-Control-Allow-Origin", parsedUrl.origin);
    }
    const data = JSON.parse(req.body)
    
    // console.log(data.path)
    const ip = req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"]


    const formData = new FormData()
    formData.append("ip", ip ?? "")
    formData.append("user_agent", userAgent ?? "")
    formData.append("path", data.path)
    formData.append("referer", data.referer)
    formData.append("site_id", data.site_id)

    const result = await createRecord(formData)

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
