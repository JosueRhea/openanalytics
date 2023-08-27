import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@openanalytics/db";
import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      return { ...session, user };
    },
    // @ts-ignore
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user;
      }
      return token;
    },
  },
};

export function withOwnUserAuth(action: any) {
  return async (formData: FormData | null, userId: string) => {
    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user.id;
    if (!sessionUserId) {
      return {
        error: { message: "Not authenticated" },
      };
    }

    if (sessionUserId !== userId) {
      return {
        error: { message: "Not authorized" },
      };
    }

    return action(formData, userId);
  };
}
