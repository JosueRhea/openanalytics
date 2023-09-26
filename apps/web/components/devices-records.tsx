import { formatNumber } from "@/lib/utils";
import {
  RecordByDevice,
  TIME_RANGE,
  getRecordsByDevices,
} from "@openanalytics/api";
import { COUNTRIES_BY_NAME } from "@openanalytics/api/src/lib/countries";
import { Card, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";

interface Props {
  siteId: string;
}

export async function DevicesRecords({ siteId }: Props) {
  const records = await getRecordsByDevices({
    range: TIME_RANGE.SINCE_7_DAYS,
    site_id: siteId,
  });

  if (records.error) return null;

  return (
    <Card style={{ height: 350 }}>
      <Heading size="4">Devices</Heading>
      <ScrollArea
        mt="2"
        type="always"
        scrollbars="vertical"
        style={{
          maxHeight: 300,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {records.data.map((record) => (
          <Device data={record} key={record.name} />
        ))}
      </ScrollArea>
    </Card>
  );
}

interface DeviceProps {
  data: RecordByDevice;
}

function Device({ data }: DeviceProps) {
  //   const countryCode = COUNTRIES_BY_NAME[data.name] ?? undefined;
  //   const img = countryCode
  //     ? `https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`
  //     : undefined;
  return (
    <Flex width="100%" justify="between" align="center" pr="4">
      <Flex gap="2" align="center">
        <Text>{data.name}</Text>
      </Flex>
      <Heading size="2">{formatNumber(data.hits)}</Heading>
    </Flex>
  );
}
