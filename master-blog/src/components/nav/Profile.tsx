import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ChevronDown, LogOut, Settings, User, User2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { handleGithubLogout } from "@/lib/actions";

const Profile = async () => {
  const session = await auth();
  // console.log(session);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            className=" w-44 border border-black flex justify-between"
          >
            <div>
              <Avatar>
                <AvatarImage src={session?.user?.image as string} />
                <AvatarFallback>{session?.user?.name?.substring(0, 1)}</AvatarFallback>
              </Avatar>
            </div>

            {session?.user && session.user.name}
            <ChevronDown className=" size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" border-2 border-gray-200">
          <DropdownMenuItem className="cursor-pointer">
            <User2 className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className=" border border-gray-100" />
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className=" border border-gray-100" />
          <DropdownMenuItem className="cursor-pointer">
            <form action={handleGithubLogout}>
              <button className="flex items-center">
                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                <span className=" text-red-600">Logout</span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
