import { db } from "@/db";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user, account, profile);

      if (account?.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: profile?.email! },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              name: profile?.login as string,
              email: profile?.email as string,
              image: profile?.avatar_url as string,
            },
          });
        }
      }

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
