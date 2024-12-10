import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "db1",
    collections: {
      Users: "users",
    },
  }),
  debug: true,
  logger: {
    error: (code, ...message) => {
      console.error(code, message);
    },
    warn: (code, ...message) => {
      console.warn(code, message);
    },
    debug: (code, ...message) => {
      console.debug(code, message);
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign-in attempt:", { user, account, profile });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect:", { url, baseUrl });
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
});

export { handler as GET, handler as POST };
