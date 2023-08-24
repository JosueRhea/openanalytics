import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@openanalytics/db"

export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            return { ...session, user }
        },
        // @ts-ignore
        async jwt({ token, user, account, profile }) {
            if (typeof user !== "undefined") {
                // user has just signed in so the user object is populated
                return user
            }
            return token
        }
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }