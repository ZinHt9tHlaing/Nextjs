import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendSession = DefaultSession["user"] & {
  id: string;
  role: string;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
  image: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendSession;
  }
}
