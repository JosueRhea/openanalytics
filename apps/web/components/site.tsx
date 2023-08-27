import { type Site as SiteT } from "@openanalytics/db/src/schema";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  data: SiteT;
};

export const Site = ({ data }: Props) => {
  return (
    <Card asChild>
      <Link href="/dashboard">
        <Flex gap="3" align="center">
          <Avatar size="3" src="" radius="full" fallback="NA" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {data.name}
            </Text>
            <Text as="div" size="2" color="gray">
              {data.url}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
};
