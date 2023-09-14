import { formatNumber } from "@/lib/utils";
import {
  RecordsByCountry,
  TIME_RANGE,
  getRecordsByCountry,
} from "@openanalytics/api";
import { COUNTRIES_BY_NAME } from "@openanalytics/api/src/lib/countries";
import { Box, Card, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";

interface Props {
  siteId: string;
}

export async function CountryRecords({ siteId }: Props) {
  const records = await getRecordsByCountry({
    range: TIME_RANGE.SINCE_7_DAYS,
    site_id: siteId,
  });

  if (records.error) return null;

  return (
    <Card>
      <Heading size="4">Countries</Heading>
      <ScrollArea
        mt="2"
        type="always"
        style={{
          maxHeight: 300,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {records.data.map((record) => (
          <Country data={record} key={record.country} />
        ))}
      </ScrollArea>
    </Card>
  );
}

interface CountryProps {
  data: RecordsByCountry;
}

function Country({ data }: CountryProps) {
  const countryCode = COUNTRIES_BY_NAME[data.country] ?? undefined;
  const flagUrl = countryCode
    ? `https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`
    : undefined;
  return (
    <Flex width="100%" justify="between" align="center" pr="4">
      <Flex gap="2" align="center">
        <img
          style={{
            objectFit: "contain",
          }}
          src={flagUrl}
          alt=""
        />
        <Text>{data.country}</Text>
      </Flex>
      <Heading size="2">{formatNumber(data.hits)}</Heading>
    </Flex>
  );
}
