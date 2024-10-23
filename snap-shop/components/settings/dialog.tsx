import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

const DialogWindow = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <UserRoundPen className="size-5 cursor-pointer text-muted-foreground hover:text-black hover:scale-110 active:scale-95 duration-200" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wanna update your profile?</DialogTitle>
            <Input type="text" className="w-full" />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogWindow;
