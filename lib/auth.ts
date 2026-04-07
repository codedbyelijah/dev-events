import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getMongoClient } from "./mongodb";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";
import { User } from "@/database";
import NextAuth from "next-auth";

export const authOptions = {
  adapter: MongoDBAdapter(getMongoClient),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = await User.findOne({
          email: credentials!.email,
        }).select("+password");
        if (!user || !(await user.comparePassword(credentials!.password))) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
};

export default NextAuth(authOptions);
