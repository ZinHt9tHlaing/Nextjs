import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ClipboardPlus, NotebookPen, Plus } from "lucide-react";
import Link from "next/link";

const AddBtn = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} className=" active:scale-95 duration-200">
            Add <Plus className=" ms-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" border-2 border-gray-200">
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/user/add-post" className="flex items-center">
              <ClipboardPlus className="mr-2 h-4 w-4" />
              <span>Add Post</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className=" border border-gray-100" />
          <DropdownMenuItem className="cursor-pointer">
            <Link href={"/user/add-topic"} className="flex items-center">
              <NotebookPen className="mr-2 h-4 w-4" />
              <span>Add Topic</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddBtn;
