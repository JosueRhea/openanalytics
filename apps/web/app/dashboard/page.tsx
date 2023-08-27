import { DashboardNav, Site } from "@/components";
import { authOptions } from "@openanalytics/api/src/auth";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <Flex width="100%" direction="column" gap="4" py="2">
      <DashboardNav session={session} />
      <Heading size="4">Your sites</Heading>
      <Grid columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }} gap="4">
        <Site />
        <Site />
        <Site />
        <Site />
        <Site />
        <Site />
      </Grid>
    </Flex>
  );
}

export default DashboardPage;
