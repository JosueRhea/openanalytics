import { Login } from "@/components";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h3>Hello world</h3>
      {!session ? (
        <Login hasSession={session != null} />
      ) : (
        <div>
          <p>{JSON.stringify(session)}</p>
        </div>
      )}
    </>
  );
}
