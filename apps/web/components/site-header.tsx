import { getSite } from "@openanalytics/api";
import { Box, Heading, Text } from "@radix-ui/themes";

interface Props {
  siteId: string;
}

export async function SiteHeader({ siteId }: Props) {
  const site = await getSite({ site_id: siteId });

  if(site.error) return null;

  return (
    <Box mt={"6"}>
      <Heading>{site.data.name}</Heading>
      <Text>{site.data.url}</Text>
    </Box>
  );
}
