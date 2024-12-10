/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      callbackUrl: "https://reformify.dev/api/auth/callback/github",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "db1",
    collections: {
      Users: "users",
    },
  }),
});

export { handler as GET, handler as POST };
