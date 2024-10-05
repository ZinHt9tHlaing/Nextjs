"use client";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

const UserBtn = ({ user, expires }: Session) => {
  console.log(user);

  return (
    <div>
      {user?.email}{" "}
      {!user?.email ? (
        <Button className="active:scale-95 duration-200" asChild>
          <Link href={"/auth/login"} className="space-x-2">
            <LogIn /> <span>Login</span>
          </Link>
        </Button>
      ) : (
        <Button
          variant={"destructive"}
          onClick={() => signOut()}
          className="active:scale-95 duration-200"
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default UserBtn;
