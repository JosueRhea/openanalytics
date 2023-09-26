import { Avatar, Flex, Link as RLink } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { Logout } from "./logout";
import { AddSite } from "./add-site";
import { authOptions } from "@openanalytics/api/src/auth";
import Link from "next/link";
import { SelectSite } from "./select-site";
import { getSites } from "@openanalytics/api";
import { Logo } from "@/icons/logo";

export async function DashboardNav() {
  const session = await getServerSession(authOptions);
  const sites = await getSites();

  return (
    <Flex justify="between" align="center">
      {/* <Heading size="6">OpenAnalytics</Heading> */}
      <Flex align={"center"} gap="2">
        <Link
          style={{
            padding: 0,
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          href={"/dashboard"}
        >
          <Logo />
        </Link>
        {!sites.error && <SelectSite data={sites.data} />}
      </Flex>
      <Flex align={"center"} gap="2">
        {session && (
          <>
            <Logout />
            <AddSite userId={session?.user.id as string} />
            <Avatar src={session?.user?.image ?? undefined} fallback={"NA"} />
          </>
        )}
      </Flex>
    </Flex>
  );
}
