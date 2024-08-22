"use server";

import { signIn, signOut } from "./auth";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleGithubLogout = async () => {
  await signOut();
};
