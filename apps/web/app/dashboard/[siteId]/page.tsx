import { RecordHits } from "@/components/record-hits";
import { SiteHeader } from "@/components/site-header";
import { TIME_RANGE, getRecordsByCountry } from "@openanalytics/api";

export default async function Page({ params }: { params: { siteId: string } }) {
  // const data = await getRecordsByCountry({
  //   range: TIME_RANGE.SINCE_7_DAYS,
  //   site_id: params.siteId,
  // });

  // console.log(data)

  return (
    <div>
      <SiteHeader siteId={params.siteId} />
      <RecordHits siteId={params.siteId} />
    </div>
  );
}
