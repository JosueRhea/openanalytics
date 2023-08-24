"use client";
import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

export function Logout() {
  return (
    <Button onClick={() => signOut()} color="gray" variant="soft">
      Sign out
    </Button>
  );
}
