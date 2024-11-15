"use client";

import { Session } from "next-auth";
import SettingsCard from "./settings-card";
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
import { useState } from "react";
import AvatarUploadForm from "./avatar-upload-form";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:768px)");
  // console.log(isDesktop);

  const handleIsOpen = () => {
    setIsOpen(false);
  };

  return (
    <SettingsCard>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <AvatarUploadForm
            name={session.user?.name!}
            image={session.user?.image}
            email={session.user?.email!}
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Display Name
            </p>
            <h2 className="font-semibold text-xl">@{session.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">Email:</p>
            <p className="text-base font-medium">{session.user?.email}</p>
          </div>
        </div>
        {isDesktop ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
            </DialogTrigger>
            <DialogContent className="mx-4 lg:mx-0">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  This will be your public display name.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={handleIsOpen}
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
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
            </DrawerTrigger>
            <DrawerContent className="mx-4 lg:mx-0">
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  This will be your public display name.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={handleIsOpen}
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
