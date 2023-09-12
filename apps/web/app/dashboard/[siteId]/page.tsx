import { RecordHits } from "@/components/record-hits";
import { SiteHeader } from "@/components/site-header";
import { Stats } from "@/components/stats";
import {
  TIME_RANGE,
  getRecorByHits,
  getRecordsByCountry,
  getRecordsBySingleVisitors,
} from "@openanalytics/api";
import { Flex } from "@radix-ui/themes";

export default async function Page({ params }: { params: { siteId: string } }) {
  // const data = await getRecordsByCountry({
  //   range: TIME_RANGE.SINCE_7_DAYS,
  //   site_id: params.siteId,
  // });

  const views = await getRecorByHits({
    range: TIME_RANGE.SINCE_7_DAYS,
    site_id: params.siteId,
  });

  const singleVisitors = await getRecordsBySingleVisitors({
    site_id: params.siteId,
  });

  if (views.error || singleVisitors.error) return null;

  return (
    <Flex direction="column" gap="4">
      <SiteHeader siteId={params.siteId} />
      <Stats
        totalHits={views.data.totalHits}
        singleVisitors={singleVisitors.data.total}
      />
      <RecordHits data={views.data} />
    </Flex>
  );
}
