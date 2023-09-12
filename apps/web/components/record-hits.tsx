import { RecordsByHits, TIME_RANGE, getRecorByHits } from "@openanalytics/api";
import { Chart } from "./chart";
import { Flex } from "@radix-ui/themes";

interface Props {
  data: RecordsByHits;
}

export async function RecordHits({ data }: Props) {
  // console.dir(hits, { depth: null });

  if (!data) return null;
  return (
    <Flex gap="8" direction="column" mt={"6"}>
      <Chart data={data.records} dataKey="views" labelKey="date" />
    </Flex>
  );
}
