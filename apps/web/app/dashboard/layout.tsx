import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@openanalytics/api/src/auth";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  return <div className="w-full">{children}</div>;
}

export default Layout;
