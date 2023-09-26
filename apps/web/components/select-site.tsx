"use client";
import { Site } from "@openanalytics/db/src/schema";
import { Select } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";

interface Props {
  data: Site[];
}

export const SelectSite = ({ data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const currentSiteId = params?.siteId as string;

  if (!currentSiteId) return null;
  return (
    <Select.Root
      onValueChange={(value) => {
        router.push(`/dashboard/${value}`);
      }}
      value={currentSiteId}
    >
      <Select.Trigger variant="soft" placeholder="Select a site..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Sites</Select.Label>
          {data.map((site) => (
            <Select.Item key={site.id} value={site.id}>
              {site.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
