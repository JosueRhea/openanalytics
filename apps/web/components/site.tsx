import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export const Site = () => {
  return (
    <Card asChild>
      <Link href="/dashboard">
        <Flex gap="3" align="center">
          <Avatar size="3" src="" radius="full" fallback="NA" />
          <Box>
            <Text as="div" size="2" weight="bold">
              Headless audioplayer
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
};
