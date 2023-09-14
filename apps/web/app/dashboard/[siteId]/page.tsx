import { CountryRecords } from "@/components/country-records";
import { RecordHits } from "@/components/record-hits";
import { SiteHeader } from "@/components/site-header";
import { Stats } from "@/components/stats";
import {
  TIME_RANGE,
  getRecorByHits,
  getRecordsBySingleVisitors,
} from "@openanalytics/api";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Page({ params }: { params: { siteId: string } }) {
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
      <Grid columns={{ initial: "1", xs: "2", sm: "3" }} gap="4" mt="4">
        <CountryRecords siteId={params.siteId} />
      </Grid>
    </Flex>
  );
}
