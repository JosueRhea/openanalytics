import { Avatar, Flex, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { Logout } from "./logout";
import { AddSite } from "./add-site";
import { authOptions } from "@openanalytics/api/src/auth";

export async function DashboardNav() {
  const session = await getServerSession(authOptions);

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
