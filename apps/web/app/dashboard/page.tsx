import { DashboardNav, Site } from "@/components";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
