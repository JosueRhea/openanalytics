import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  return <div className="w-full">{children}</div>;
}

export default Layout;
