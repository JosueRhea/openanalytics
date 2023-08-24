"use client";
import { signIn, signOut } from "next-auth/react";
interface Props {
  hasSession: boolean;
}

export function Login({ hasSession }: Props) {
  return (
    <div>
      {hasSession ? (
        <button onClick={() => signOut()}>logout</button>
      ) : (
        <button onClick={() => signIn("github")}>Login</button>
      )}
    </div>
  );
}
