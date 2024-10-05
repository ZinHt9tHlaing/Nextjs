"use client";

import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const ProviderLogin = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
        className="border border-black -transition-transform active:scale-95 duration-200"
      >
        <p className="flex gap-2 items-center">
          <FcGoogle /> Login with Google
        </p>
      </Button>
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
        className="border border-black -transition-transform active:scale-95 duration-200"
      >
        <p className="flex gap-2 items-center">
          <FaGithub /> Login with Github
        </p>
      </Button>
    </div>
  );
};

export default ProviderLogin;
