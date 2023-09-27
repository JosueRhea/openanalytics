"use client";
import { Site } from "@openanalytics/db/src/schema";
import { PlusIcon } from "@radix-ui/react-icons";
import { Select } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";

interface Props {
  data: Site[];
}

const ADD_SITE_KEY = "Add site"

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
      value={currentSiteId ?? ADD_SITE_KEY}
    >
      <Select.Trigger variant="soft" placeholder="Select a site..." />
      <Select.Content highContrast>
        <Select.Group>
          <Select.Label>Sites</Select.Label>
          {data.map((site) => (
            <Select.Item key={site.id} value={site.id}>
              {site.name}
            </Select.Item>
          ))}
          <Select.Item  value={ADD_SITE_KEY}>
            <PlusIcon width={10} height={10} /> {ADD_SITE_KEY}
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
