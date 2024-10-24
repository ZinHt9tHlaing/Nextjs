"use client";

import { Session } from "next-auth";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import ProfileForm from "./profile-form";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  // console.log(isDesktop);

  return (
    <SettingsCard>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-14">
            <AvatarImage src={session?.user?.image!} alt="profile" />
            <AvatarFallback className="bg-primary text-white font-semibold">
              {session.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-xl">{session.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        {isDesktop ? (
          <Dialog>
            <DialogTrigger asChild>
              <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  This will be your public display name.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant={"outline"}
                    className="border border-primary active:scale-95 duration-200 w-full"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer>
            <DrawerTrigger asChild>
              <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  This will be your public display name.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
              />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    variant={"outline"}
                    className="border border-primary active:scale-95 duration-200"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
