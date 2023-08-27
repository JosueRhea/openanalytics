import { Avatar, Flex, Heading } from "@radix-ui/themes";
import type { Session } from "next-auth";
import { Logout } from "./logout";
import { AddSite } from "./add-site";

interface Props {
  session: Session | null;
}

export function DashboardNav({ session }: Props) {
  return (
    <Flex justify="between" align="center">
      <Heading size="6">OpenAnalytics</Heading>
      <Flex align={"center"} gap="2">
        <Logout />
        <AddSite userId={session?.user.id as string} />
        <Avatar src={session?.user?.image ?? undefined} fallback={"NA"} />
      </Flex>
    </Flex>
  );
}
