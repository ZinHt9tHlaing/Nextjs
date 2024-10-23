import { Session } from "next-auth";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  // console.log(session);

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
        <Dialog>
          <DialogTrigger>
            <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
          </DialogTrigger>
          <DialogContent className=" lg:px-0">
            <DialogHeader>
              <DialogTitle>Wanna update your profile?</DialogTitle>
              <Input type="text" className="w-full my-6" />
              <Button>Save Changes</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
