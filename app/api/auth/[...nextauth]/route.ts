/* eslint-disable @typescript-eslint/ban-ts-comment */
import { prismaInstance } from "@/lib/prismaInstance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await prismaInstance.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            throw new Error("Invalid User");
          }

          // compare the password
          const isValidPassword = await bcrypt.compare(
            credentials?.password,
            user?.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid Credentials");
          }
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          throw new Error(`Something went wrong. Login Failed : ${error}`);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user?.id;
        // @ts-ignore
        token.username = user?.username;
        token.email = user?.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token?.id;
        // @ts-ignore
        session.user.username = token?.username;
        // @ts-ignore
        session.user.email = token?.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
