import { Site } from "@/components";
import { getSites } from "@openanalytics/api";
import { Flex, Grid, Heading } from "@radix-ui/themes";

async function DashboardPage() {
  const sites = await getSites();

  return (
    <Flex width="100%" direction="column" gap="4" py="2">
      <Heading size="4">Your sites</Heading>
      <Grid columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }} gap="4">
        {sites.data && sites.data.length > 0 && (
          <>
            {sites.data.map((site) => (
              <Site data={site} key={site.id} />
            ))}
          </>
        )}
      </Grid>
    </Flex>
  );
}

export default DashboardPage;
