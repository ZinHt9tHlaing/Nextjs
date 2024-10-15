"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut, Settings, Truck } from "lucide-react";

const UserBtn = ({ user, expires }: Session) => {
  // console.log(user);

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
        // <Button
        //   variant={"destructive"}
        //   onClick={() => signOut()}
        //   className="active:scale-95 duration-200"
        // >
        //   Logout
        // </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="active:scale-90 duration-200">
            <Avatar>
              <AvatarImage src={user.image!} />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-4">
            <div className="flex gap-2 p-4 mb-4 items-center border-2 border-primary rounded-lg cursor-pointer hover:scale-95 duration-300">
              <Avatar>
                <AvatarImage src={user.image!} />
                <AvatarFallback className="text-white bg-primary font-bold">
                  {user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm">{user.name}</h3>
                <p className="font-medium text-sm">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer group hover:bg-primary/10 duration-300">
              <Truck className="size-5 mr-3 group-hover:translate-x-1 group-hover:text-primary transition-all ease-in-out duration-300" />
              <span className="text-sm font-medium">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer group hover:bg-primary/10 duration-300">
              <Settings className="size-5 mr-3 group-hover:rotate-90 group-hover:text-primary transition-all ease-in-out duration-300" />
              <span className="text-sm font-medium">Setting</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:bg-red-200 group"
              onClick={() => signOut()}
            >
              <LogOut className="size-5 mr-3 group-hover:scale-95 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm font-semibold group-hover:text-red-600 transition-all duration-300">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserBtn;
