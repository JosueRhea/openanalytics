import { type Site as SiteT } from "@openanalytics/db/src/schema";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

type Props = {
  data: SiteT;
};

export const Site = ({ data }: Props) => {
  const domain = useMemo(() => {
    try {
      const url = new URL(data.url);
      return url.host;
    } catch (error) {
      return null;
    }
  }, [data]);

  return (
    <Card asChild>
      <Link href={`/dashboard/${data.id}`}>
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src={
              domain
                ? `https://favourable-plum-panda.faviconkit.com/${domain}/16`
                : undefined
            }
            // radius="full"
            fallback="NA"
          />
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
