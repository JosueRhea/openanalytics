import { TIME_RANGE, getRecorByHits } from "@openanalytics/api";
import { Chart } from "./chart";
import { Flex } from "@radix-ui/themes";

interface Props {
  siteId: string;
}

export async function RecordHits({ siteId }: Props) {
  const hits = await getRecorByHits({
    range: TIME_RANGE.SINCE_7_DAYS,
    site_id: siteId,
  });

  // console.dir(hits, { depth: null });

  if (hits.error) return null;
  return (
    <Flex gap="8" direction="column" mt={"6"}>
      <Chart data={hits.data.records} dataKey="hits" labelKey="date" />
    </Flex>
  );
}
